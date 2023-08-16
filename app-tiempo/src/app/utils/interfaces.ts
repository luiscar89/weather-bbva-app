export interface City {
  name?: string;
  iso2: string;
  iso3?: string;
  capital: string;
}

export interface WeatherInfo {
  name: string;
  temperature: number;
  tempMax: number;
  tempMin: number;
  icon: any;
  lat: number;
  long: number;
}
