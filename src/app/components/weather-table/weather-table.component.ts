import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ApiForecastResponse} from "../../models/api-forecast-response.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-weather-table',
  standalone: true,
  templateUrl: './weather-table.component.html',
  imports: [CommonModule, RouterLink]
})
export class WeatherTableComponent {
  @Input() forecastList: ApiForecastResponse[] = [];
  protected readonly iconBaseUrl= 'https://openweathermap.org/img/wn/'
}
