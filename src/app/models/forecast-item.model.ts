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
  hour!: string;
  pop!: number;

  @Type(() => MainData)
  main!: MainData;

  @Type(() => WeatherInfo)
  weather!: WeatherInfo[];

  @Type(() => WindData)
  wind!: WindData;

  @Expose()
  rain?: {
    '3h': number;
  };

  @Expose()
  snow?: {
    '3h': number;
  };

  @Expose()
  get rainAmount(): number {
    return (this.rain && typeof this.rain['3h'] === 'number') ? this.rain['3h'] : 0;
  }

  @Expose()
  get snowAmount(): number {
    return (this.snow && typeof this.snow['3h'] === 'number') ? this.snow['3h'] : 0;
  }

  get iconUrl(): string {
    return `https://openweathermap.org/img/wn/${this.weather[0].icon}.png`
  }

}
