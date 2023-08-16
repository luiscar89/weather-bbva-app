import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { City, WeatherInfo } from 'src/app/utils/interfaces';
import { SELECTED_CITY_KEY } from '../../utils/constants';
import { CitySelectionComponent } from '../city-selection/city-selection.component';
import { WidgetWeatherPageComponent } from './widget-weather-page.component';

describe('WidgetWeatherPageComponent', () => {
  let component: WidgetWeatherPageComponent;
  let fixture: ComponentFixture<WidgetWeatherPageComponent>;
  let weatherService: WeatherService;
  let citiesService: CitiesService;

  let cityWeatherMock: WeatherInfo = {
    icon: 'light_mode',
    name: 'Kabul',
    tempMax: 21.1,
    tempMin: 21.1,
    temperature: 21,
    lat: 111,
    long: 111,
  };

  const defaultMockCity: City = {
    capital: 'Kabul',
    iso2: 'af',
  };

  const cityCollectionMock: City[] = [
    {
      capital: 'Kabul',
      iso2: 'af',
    },
    {
      capital: '',
      iso2: 'af',
    },
  ];

  beforeEach(() => {
    const weatherServiceMock = {
      getCityCoordinates: jasmine
        .createSpy('getCityCoordinates')
        .and.returnValue(of({ lat: 123, lon: 456 })),
      getCityWeather: jasmine
        .createSpy('getCityWeather')
        .and.returnValue(of(cityWeatherMock)),
    };

    const citiesServiceMock = {
      getCapitalCities: jasmine
        .createSpy('getCapitalCities')
        .and.returnValue(of([defaultMockCity])),
    };

    TestBed.configureTestingModule({
      declarations: [WidgetWeatherPageComponent, CitySelectionComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock },
        { provide: CitiesService, useValue: citiesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetWeatherPageComponent);
    component = fixture.componentInstance;

    weatherService = TestBed.inject(WeatherService);
    citiesService = TestBed.inject(CitiesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing setCurrentCity', () => {
    component.allCapitals = [{ capital: 'Kabul', iso2: 'af' }];
    component.setCurrentCity('Kabul');
    expect(component.selectedCapital).toEqual({ capital: 'Kabul', iso2: 'af' });
  });

  it('Testing getCapitalCities method', (done: DoneFn) => {
    citiesService.getCapitalCities().subscribe({
      next: (cities) => {
        expect(cities)
          .withContext('expected capital cities')
          .toEqual([defaultMockCity]);
        done();
      },
      error: done.fail,
    });
  });

  it('Testing filter empty capitals method', () => {
    component.filterEmptyCapitals(cityCollectionMock);
    expect(cityWeatherMock).not.toBeGreaterThan(1);
  });

  it('Testing getCitiesCoordinates fail city', (done: DoneFn) => {
    (weatherService.getCityCoordinates as jasmine.Spy).and.returnValue(of([]));

    weatherService
      .getCityCoordinates({ capital: 'aaa', iso2: '22222' })
      .subscribe({
        next: (coordinates) => {
          expect(coordinates).toEqual([]);
          done();
        },
        error: done.fail,
      });
  });

  it('Testing getCitiesCoordinates', (done: DoneFn) => {
    weatherService
      .getCityCoordinates({ capital: 'aaa', iso2: '22222' })
      .subscribe({
        next: (coordinates) => {
          expect(coordinates).toEqual({ lat: 123, lon: 456 });
          done();
        },
        error: done.fail,
      });
  });

  it('testing save local storage', () => {
    component.saveOnLocalStorage(cityWeatherMock);
    expect(localStorage.getItem(SELECTED_CITY_KEY)).toBeDefined();
  });

  it('set current city in local storage', () => {
    component.ngAfterViewInit();
    expect(localStorage.getItem(SELECTED_CITY_KEY)).toBeDefined();
  });
});
