import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ApiForecastResponse} from "../models/api-forecast-response.model";
import {plainToInstance} from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '4cd6fd8911f6e75c9afc398da4ee0de5';
  private baseUrl = 'https://api.openweathermap.org/';
  private readonly http = inject(HttpClient)

  async getForecastFromCityName(cityName: string): Promise<ApiForecastResponse> {
    const plainObj = await firstValueFrom(this.http.get(`${this.baseUrl}data/2.5/forecast?q=${cityName}&units=metric&appid=${this.apiKey}`));
    return plainToInstance(ApiForecastResponse, plainObj);
  }
}
