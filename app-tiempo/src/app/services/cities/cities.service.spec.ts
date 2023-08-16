import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CitiesService } from './cities.service';

import { of } from 'rxjs';
import { citiesArr } from '../../utils/demo-data';

describe('Test for cities service. To check if data is getting correctly', () => {
  let service: CitiesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CitiesService(httpClientSpy);
  });

  it('The service should be create', () => {
    expect(service).toBeTruthy();
  });

  it('should return city capitals (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(citiesArr));

    service.getCapitalCities().subscribe({
      next: (capitals) => {
        expect(capitals).withContext('expected capitals').toEqual(citiesArr);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
