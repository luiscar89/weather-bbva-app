import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CitiesService {
  constructor(public http: HttpClient) {}

  getCapitalCities(): Observable<any> {
    return this.http.get(
      'https://countriesnow.space/api/v0.1/countries/capital'
    );
  }
}
