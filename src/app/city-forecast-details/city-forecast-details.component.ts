import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ApiForecastResponse} from "../models/api-forecast-response.model";
import {WeatherService} from "../services/weather.service";
import {ForecastItem} from "../models/forecast-item.model";

@Component({
  selector: 'app-city-forecast-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-forecast-details.component.html',
})
export class CityForecastDetailsComponent implements OnInit {
  protected cityForecast!: ApiForecastResponse;
  protected currentForecast!: ForecastItem;
  protected readonly iconBaseUrl= 'https://openweathermap.org/img/wn/'
  private readonly weatherService = inject(WeatherService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.onInit().then()
  }

  private async onInit() {
    const cityName = this.route.snapshot.params['cityName'];
    this.cityForecast = await this.weatherService.getForecastFromCityName(cityName);
    this.currentForecast = this.cityForecast.forecastList[0];
  }
}
