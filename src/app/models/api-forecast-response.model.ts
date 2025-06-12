import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import {Expose, Transform, Type} from "class-transformer";

dayjs.extend(utc)

class Coordinates {
  lat!: number;
  lon!: number;
}

// For the main "weather" object in each forecast item
class WeatherInfo {
  id!: number;
  main!: string;
  description!: string;
  icon!: string;
}

// For the "main" data in each forecast item
class MainData {
  temp!: number;
  feels_like!: number;
}

class WindData {
  speed!: number;
  deg!: number;
  gust!: number;
}

// Represents a single forecast entry in the "list"
class ForecastItem {
  dt!: number;

  @Type(() => MainData)
  main!: MainData;

  @Type(() => WeatherInfo)
  weather!: WeatherInfo[];

  @Type(() => WindData)
  wind!: WindData[];

  pop!: number;

  @Expose()
  @Transform(({ obj }) => obj.rain ? obj.rain['3h'] : 0)
  rain!: number;

  @Expose()
  @Transform(({ obj }) => obj.snow ? obj.snow['3h'] : 0)
  snow!: number;

}

class CityModel {

  id!: number ;
  name!: string ;

  @Type(() => Coordinates)
  coord!: Coordinates;

  timezone!: number;
  sunrise!: number;
  sunset!: number;

  get currentHour(){
    return dayjs().utcOffset(this.timezone / 60).format('HH:mm')
  }
  get formattedSunrise() {
    return dayjs.unix(this.sunrise).utcOffset(this.timezone / 60).format('HH:mm')
  }
  get formattedSunset() {
    return dayjs.unix(this.sunset).utcOffset(this.timezone / 60).format('HH:mm')
  }
}

export class ApiForecastResponse {
  @Type(() => CityModel)
  city!: CityModel;

  @Expose({ name: 'list' })
  @Type(() => ForecastItem)
  forecastsList!: ForecastItem[];

}
