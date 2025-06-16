import {Type, Transform, Expose} from "class-transformer";

class WeatherInfo {
  id!: number;
  main!: string;
  description!: string;
  icon!: string;
}

class MainData {
  temp!: number;
  feels_like!: number;
  humidity!: number;
}

class WindData {
  speed!: number;
  deg!: number;
  gust!: number;
}

export class ForecastItem {
  dt!: number;

  @Type(() => MainData)
  main!: MainData;

  @Type(() => WeatherInfo)
  weather!: WeatherInfo[];

  @Type(() => WindData)
  wind!: WindData;

  pop!: number;

  @Expose()
  @Transform(({ obj }) => obj.rain ? obj.rain['3h'] : 0)
  rain!: number;

  @Expose()
  @Transform(({ obj }) => obj.snow ? obj.snow['3h'] : 0)
  snow!: number;

}
