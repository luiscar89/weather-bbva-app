import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { City, WeatherInfo } from 'src/app/utils/interfaces';
import { SAVE_WEATHER_CITY_KEY } from '../../utils/constants';

@Component({
  selector: 'app-widget-weather',
  templateUrl: './widget-weather-page.component.html',
  styleUrls: ['./widget-weather-page.component.scss'],
})
export class WidgetWeatherPageComponent implements OnDestroy, AfterViewInit {
  citySelected: string = 'Kabul';
  selectedCapital = { capital: 'Kabul', iso2: 'af' };
  allCapitals: City[] = [{ capital: '', iso2: '' }];
  weatherInfo: WeatherInfo | null = null;

  destroy$ = new Subject<void>();

  cities$: Observable<City[]> = this.citiesSrv.getCapitalCities().pipe(
    map((cities) => {
      this.allCapitals = this.filterEmptyCapitals(cities.data);
      return this.allCapitals;
    })
  );

  currentCitySubject$ = new Subject<any>();

  weather$: Observable<WeatherInfo> = this.currentCitySubject$.pipe(
    switchMap((currentCity) =>
      this.weatherSrv.getCityCoordinates(currentCity).pipe(
        map((cityCoor) => {
          return cityCoor.length
            ? { lat: cityCoor[0]?.lat, lon: cityCoor[0].lon }
            : { lat: 0, lon: 0 };
        }),
        switchMap((cityCoor) => {
          return this.weatherSrv.getCityWeather(cityCoor?.lat, cityCoor?.lon);
        })
      )
    )
  );

  constructor(
    public weatherSrv: WeatherService,
    public citiesSrv: CitiesService
  ) {
    this.weather$.pipe(takeUntil(this.destroy$)).subscribe((weather) => {
      this.weatherInfo = weather;
      this.saveOnLocalStorage(this.weatherInfo);
    });
  }

  ngAfterViewInit(): void {
    this.currentCitySubject$.next({ capital: 'Kabul', iso2: 'af' });
    localStorage.setItem('selectedCity', this.selectedCapital.capital);
  }

  filterEmptyCapitals(cities: City[]): City[] {
    return cities?.filter((city) => city.capital !== '');
  }

  saveOnLocalStorage(formatedData: WeatherInfo): void {
    const getLocalStorageInfo =
      localStorage.getItem(SAVE_WEATHER_CITY_KEY) &&
      JSON.parse(localStorage.getItem(SAVE_WEATHER_CITY_KEY) as string);

    const alreadyExist =
      getLocalStorageInfo &&
      getLocalStorageInfo.some((city: any) => city.name === formatedData.name);

    if (!alreadyExist) {
      const savedWeatherCities = getLocalStorageInfo
        ? [...getLocalStorageInfo, formatedData]
        : [formatedData];
      localStorage.setItem(
        SAVE_WEATHER_CITY_KEY,
        JSON.stringify(savedWeatherCities)
      );
    }
  }

  setCurrentCity(e: any): void {
    const selectedCapital = this.allCapitals.filter(
      (city: any) => city.capital === e
    );

    this.currentCitySubject$.next({
      capital: selectedCapital[0].capital,
      iso2: selectedCapital[0].iso2,
    });

    this.citySelected = selectedCapital[0].capital;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
