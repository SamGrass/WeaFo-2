import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import {Expose, plainToInstance, Type} from "class-transformer";
import {CityModel} from "./city-model.model";
import {ForecastItem} from "./forecast-item.model";
import {DailyForecastList} from "./daily-forecast-list.model";

dayjs.extend(utc);

export class ApiForecastResponse {
  @Type(() => CityModel)
  city!: CityModel;

  @Expose({name: 'list'})
  @Type(() => ForecastItem)
  forecastList!: ForecastItem[];

  @Type(() => DailyForecastList)
  dailyForecastList?: DailyForecastList[];

  convertForecastHourWithOffset() {
    this.forecastList.forEach(item => item.hour = dayjs.unix(item.dt).utcOffset(this.city.timezone / 60).format('HH'));
  }

  getDailyForecastList() {
    const groupedByDay = this.forecastList.reduce<Record<string, ForecastItem[]>>((accumulator, item) => {
      const dayKey = dayjs.unix(item.dt).utcOffset(this.city.timezone / 60).format('dddd, DD MMM');
      if (!accumulator[dayKey]) {
        accumulator[dayKey] = [];
      }
      accumulator[dayKey].push(item);
      return accumulator;
    }, {});
    const dailyListsData = Object.entries(groupedByDay).map(([day, forecastItems]) => {
      return {
        day: day,
        forecastItems: forecastItems
      };
    });
    this.dailyForecastList = plainToInstance(DailyForecastList, dailyListsData);
  }
}
