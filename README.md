# App Weather
This application has been developed to obtain weather information for several capital cities around the world. It encompasses the following features:

* The cities' information is sourced from the following API: https://countriesnow.space/. This API provides a list of capital cities from around the world.
* Once a user selects a capital city, another API call is made to https://openweathermap.org/ in order to retrieve the city's coordinates, which are necessary for querying weather information.
* Using the same API, we can retrieve the weather data based on the previously obtained coordinates.
* This information is presented within a card that displays temperature details and the name of the selected capital city. Additionally, an icon representing the current weather conditions is shown, sourced from the Material Icon library. Notably, I've utilized ngClass to dynamically change the color of temperature data, indicating higher temperatures or very high temperatures.
* In the event of a lost internet connection, users can still access weather information for cities they previously consulted. Every selected city is saved in localStorage. However, cities that haven't been consulted before won't be available, and the application will display an error message for such cases.
* All the services within the application have been thoroughly tested using unit tests with Jasmine.
* I've employed RxJs and reactive programming to manage API calls. This approach ensures that the application always has the required information available, accessible through subscriptions in different parts of the application.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Compatibilty

This app is tested in all modern browsers and is compatible with: Chrome, Safari, Firefox, Edge, Opera
