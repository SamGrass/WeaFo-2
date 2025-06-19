import {ForecastItem} from "./forecast-item.model";
import {Type} from "class-transformer";

export class DailyForecastList {
  day!: string;

  @Type(() => ForecastItem)
  forecastItems!: ForecastItem[];

  get maxTemp() {
    const forecastTemps = this.forecastItems.map(item => item.main.temp);
    return Math.max(...forecastTemps);
  }

  get minTemp(): number {
    const forecastTemps = this.forecastItems.map(item => item.main.temp);
    return Math.min(...forecastTemps);
  }

  get avgTemp() {
    return this.forecastItems.reduce((acc, item) => acc + item.main.temp, 0) / this.forecastItems.length;
  }

  get nightIconUrl(){
    let nightIconUrl;
    this.forecastItems.map(item => {
      if (+item.hour >= 0 && +item.hour < 5) {
        nightIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      }
    });
    return nightIconUrl;
  }

  get morningIconUrl(){
    let morningIconUrl;
    this.forecastItems.map(item => {
      if (+item.hour >= 5 && +item.hour < 11) {
        morningIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      }
    });
    return morningIconUrl;
  }

  get afternoonIconUrl(){
    let afternoonIconUrl;
    this.forecastItems.map(item => {
      if (+item.hour >= 11 && +item.hour < 17) {
        afternoonIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      }
    });
    return afternoonIconUrl;
  }

  get eveningIconUrl(){
    let eveningIconUrl;
    this.forecastItems.map(item => {
      if (+item.hour >= 17 && +item.hour < 24) {
        eveningIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      }
    });
    return eveningIconUrl;
  }

  get sumPrecipitation(){
    return this.forecastItems.reduce((acc, item) => acc + item.rainAmount + item.snowAmount, 0)
  }

}
