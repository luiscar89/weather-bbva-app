import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SELECTED_CITY_KEY } from '../../utils/constants';
import { City } from '../../utils/interfaces';

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.scss'],
})
export class CitySelectionComponent {
  @Input() cities: City[] = [];
  @Output() setCity = new EventEmitter();
  optionSelected: string = '';

  constructor() {}

  setCurrentCity(e: any): void {
    this.optionSelected = e.target.value;
    this.setCity.emit(this.optionSelected);
    localStorage.setItem(SELECTED_CITY_KEY, e.target.value);
  }
}
