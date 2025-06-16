import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherService} from "../services/weather.service";
import {ApiForecastResponse} from "../models/api-forecast-response.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   cities = ["London", "Tokyo", "New York", "Paris", "Milan", "Sydney", "Cairo", "Rio de Janeiro", "Toronto", "Berlin"];
   forecastDataList: ApiForecastResponse[] | [] = [];
   private readonly wService = inject(WeatherService);

  async ngOnInit() {
      {
      try {
        const promises = this.cities.map(item => {
          return this.wService.getForecastFromCityName(item)
        })
        this.forecastDataList = await Promise.all(promises)
        console.log(this.forecastDataList[0].dailyData)
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        console.log(this.forecastDataList);
      }
    }
  }
}
