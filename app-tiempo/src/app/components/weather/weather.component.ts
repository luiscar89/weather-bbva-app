import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherInfo } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  @Input() weatherData: WeatherInfo = {
    temperature: 0,
    tempMax: 0,
    tempMin: 0,
    icon: '',
    name: '',
    lat: 0,
    long: 0
  };
  @Input() cityName: string = 'Kabul';
  @Input() error = false;

  constructor() {}
}
