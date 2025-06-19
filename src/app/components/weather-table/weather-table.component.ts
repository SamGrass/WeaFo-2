import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ApiForecastResponse} from "../../models/api-forecast-response.model";

@Component({
  selector: 'app-weather-table',
  standalone: true,
  templateUrl: './weather-table.component.html',
  imports: [CommonModule, RouterLink]
})
export class WeatherTableComponent {
  @Input() citiesForecastList!: ApiForecastResponse[];
}
