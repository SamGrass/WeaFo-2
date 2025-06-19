import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForecastService} from "../services/forecast.service";
import {ApiForecastResponse} from "../models/api-forecast-response.model";
import {WeatherTableComponent} from "../components/weather-table/weather-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WeatherTableComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  protected citiesForecastList: ApiForecastResponse[] = [];
  private readonly cities = ["London", "Tokyo", "New York", "Paris", "Milan", "Sydney", "Cairo", "Rio de Janeiro", "Toronto", "Berlin"];
  private readonly forecastService = inject(ForecastService);

  ngOnInit() {
    this.init().then();
  }

  private async init() {
    const promises = this.cities.map(item => this.forecastService.getForecastFromCityName(item))
    this.citiesForecastList = await Promise.all(promises)
  }
}
