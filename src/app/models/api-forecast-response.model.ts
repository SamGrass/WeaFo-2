import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import {Expose, Type} from "class-transformer";
import {DailyData} from "./daily-data.model";
import {CityModel} from "./city-model.model";
import {ForecastItem} from "./forecast-item.model";

dayjs.extend(utc)



export class ApiForecastResponse {
  @Type(() => CityModel)
  city!: CityModel;

  @Expose({name: 'list'})
  @Type(() => ForecastItem)
  forecastList!: ForecastItem[];

  get forecastsDate() {
    if (!this.forecastList || !this.city) {
      return [];
    }
    return this.forecastList.map(item => {
      return dayjs.unix(item.dt).utcOffset(this.city.timezone / 60).format('dddd, D MMM')
    })
  }


  get dailyData(): DailyData[] {
    if (!this.forecastList || !this.city) {
      return [];
    }

    const dailyDataMap: { [key: string]: DailyData } = {};

    this.forecastList.forEach(item => {
      const date = dayjs.unix(item.dt).utcOffset(this.city.timezone / 60);
      const dayKey = date.format('dddd, D MMM');
      const hour = date.hour();

      if (!dailyDataMap[dayKey]) {
        dailyDataMap[dayKey] = {
          date: dayKey,
          count: 0,
          sumTemp: 0,
          avgTemp: 0,
          minTemp: 0,
          maxTemp: 0,
          sumPrecipitation: 0,
          icon: item.weather[0].icon,
          iconPerHour: {
            night: '',
            morning: '',
            afternoon: '',
            evening: '',
          },
          temp: [],
          tempFelt: [],
          humidity: [],
          wind: [],
          rain: [],
          snow: [],
          pop: [],
        };
      }

      const dayData = dailyDataMap[dayKey];
      dayData.count++;
      dayData.sumTemp += item.main.temp;
      dayData.sumPrecipitation += item.rain + item.snow;

      dayData.temp.push(item.main.temp);
      dayData.tempFelt.push(item.main.feels_like);
      dayData.humidity.push(item.main.humidity);
      dayData.wind.push(item.wind);
      dayData.rain.push(item.rain);
      dayData.snow.push(item.snow);
      dayData.pop.push(item.pop);

      if (hour >= 5 && hour < 11) {
        dayData.iconPerHour.morning = item.weather[0].icon;
      } else if (hour >= 11 && hour < 17) {
        dayData.iconPerHour.afternoon = item.weather[0].icon;
      } else if (hour >= 17 && hour < 24) {
        dayData.iconPerHour.evening = item.weather[0].icon;
      } else if (hour >= 0 && hour < 5) {
        dayData.iconPerHour.night = item.weather[0].icon;
      }
    });

    return Object.values(dailyDataMap).map(dayData => {
      dayData.avgTemp = Math.round(dayData.sumTemp / dayData.count);
      dayData.minTemp = Math.round(Math.min(...dayData.temp));
      dayData.maxTemp = Math.round(Math.max(...dayData.temp));
      return dayData;
    });
  }
}
