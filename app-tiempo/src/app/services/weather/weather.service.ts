import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { City, WeatherInfo } from 'src/app/utils/interfaces';
import { WEATHER_ICON_MAP } from 'src/app/utils/weatherIcon.map';
import {
  NO_INTERNET_ERROR,
  SAVE_WEATHER_CITY_KEY,
  SELECTED_CITY_KEY,
} from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseUrl = 'https://api.openweathermap.org';
  errorData = false;

  constructor(public http: HttpClient) {}

  getCityWeather(latitude: number, longitude: number): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6acdae30c716fbdd1fa0839e58e341d7&units=metric`
      )
      .pipe(
        catchError((err) => {
          this.errorData = true;
          let filterCity;
          if (err.name === NO_INTERNET_ERROR) {
            const savedWeatherCities = JSON.parse(
              localStorage.getItem(SAVE_WEATHER_CITY_KEY) as string
            );
            filterCity = savedWeatherCities.filter(
              (city: City) =>
                city.name === localStorage.getItem(SELECTED_CITY_KEY)
            );

            return filterCity;
          }
          return of([]);
        }),
        map((response) => {
          return this.parseData(response);
        })
      );
  }

  getCityCoordinates(city: City): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/geo/1.0/direct?q=${city.capital},${city.iso2}&limit=1&appid=6acdae30c716fbdd1fa0839e58e341d7`
      )
      .pipe(
        catchError(() => {
          return of([]);
        }),
        map((coordinates: any) => {
          if (coordinates.length) {
            return coordinates;
          } else {
            return [];
          }
        })
      );
  }

  parseData(dataRaw: any): WeatherInfo {
    if (!dataRaw.main) {
      this.errorData = false;
      return dataRaw;
    }

    const formatedData = {
      name: dataRaw?.name,
      temperature: dataRaw.main?.temp ? Math.round(dataRaw.main?.temp) : NaN,
      tempMax: dataRaw.main?.temp_max
        ? Math.round(dataRaw.main?.temp_max)
        : NaN,
      tempMin: dataRaw.main?.temp_min
        ? Math.round(dataRaw.main?.temp_min)
        : NaN,
      icon: dataRaw.weather
        ? WEATHER_ICON_MAP.get(dataRaw.weather[0].main) ||
          WEATHER_ICON_MAP.get('no data')
        : '',
      lat: dataRaw.coord ? dataRaw.coord.lat : 0,
      long: dataRaw.coord ? dataRaw.coord.lon : 0,
    };

    return formatedData;
  }
}
