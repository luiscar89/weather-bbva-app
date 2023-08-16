import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CitySelectionComponent } from './components/city-selection/city-selection.component';
import { WidgetWeatherPageComponent } from './components/widget-weather-page/widget-weather-page.component';
import { WeatherComponent } from './components/weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    WidgetWeatherPageComponent,
    CitySelectionComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
