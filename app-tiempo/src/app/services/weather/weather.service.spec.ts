import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { of } from 'rxjs';
import { WeatherInfo } from 'src/app/utils/interfaces';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const cityWeatherArr: WeatherInfo[] = [
    {
      icon: 'light_mode',
      name: 'Kabul',
      tempMax: 21.1,
      tempMin: 21.1,
      temperature: 21,
      lat: 111,
      long: 111,
    },
  ];

  const cityWeatherMockCity = {
    icon: 'light_mode',
    name: 'Kabul',
    tempMax: 21.1,
    tempMin: 21.1,
    temperature: 21,
    lat: 111,
    long: 111,
  };

  const cityType = {
    iso2: 'AF',
    capital: 'Kabul',
  };

  const expectedCoordinatesResponse = [
    {
      name: 'Kabul',
      lat: 34.5260109,
      lon: 69.1776838,
      country: 'AF',
      state: 'Kabul Province',
    },
  ];

  const mockCoordinates = {
    latitude: 34.526,
    longitude: 69.1777,
  };

  const error = 'cannot retrieve the data required';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new WeatherService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return weather (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(cityWeatherArr));

    service
      .getCityWeather(mockCoordinates.latitude, mockCoordinates.longitude)
      .subscribe({
        next: (weather) => {
          expect(weather)
            .withContext('expected weather info')
            .toEqual(cityWeatherArr);
          done();
        },
        error: done.fail,
      });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return coordinates (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedCoordinatesResponse));

    service.getCityCoordinates(cityType).subscribe({
      next: (coordinates) => {
        expect(coordinates)
          .withContext('expected weather info')
          .toEqual(expectedCoordinatesResponse);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should fail returning coordinates (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([]));

    service.getCityCoordinates(cityType).subscribe({
      next: (coordinates) => {
        expect(coordinates).withContext('expected weather info').toEqual([]);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
