import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ApiForecastResponse} from "../models/api-forecast-response.model";
import {ForecastService} from "../services/forecast.service";
import {ForecastItem} from "../models/forecast-item.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DailyForecastTableComponent} from "../components/dayily-forecast-table/daily-forecast-table.component";
import {DailyForecastList} from "../models/daily-forecast-list.model";

@Component({
  selector: 'app-city-forecast-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-forecast-details.component.html',
})
export class CityForecastDetailsComponent implements OnInit {
  protected cityForecast!: ApiForecastResponse;
  protected currentForecast!: ForecastItem;
  private readonly forecastService = inject(ForecastService);
  private readonly route = inject(ActivatedRoute);
  private modalService = inject(NgbModal);

  ngOnInit() {
    this.onInit().then()
  }

  protected open(dailyForecastList: DailyForecastList) {
    const modalRef = this.modalService.open(DailyForecastTableComponent, {size: 'xl'});
    modalRef.componentInstance.dailyForecastList = dailyForecastList;
  }

  protected trackByDate(index: number, day: any): string {
    return day.date;
  }

  protected forecastPrecipitation(): string {
    return this.currentForecast.rainAmount > 0 ? this.currentForecast.rainAmount.toFixed(1) + ' mm' : (this.currentForecast.snowAmount > 0 ? this.currentForecast.snowAmount.toFixed(1) + ' mm' : '0 mm')
  }

  private async onInit() {
    const cityName = this.route.snapshot.params['cityName'];
    this.cityForecast = await this.forecastService.getForecastFromCityName(cityName);
    this.currentForecast = this.cityForecast.forecastList[0];
  }
}
