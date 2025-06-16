export type DailyData = {
  date: string;
  count: number;

  sumTemp: number;
  sumPrecipitation: number;
  temp: number[];
  tempFelt: number[];
  humidity: number[];
  rain: number[];
  snow: number[];
  pop: number[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  }[];

  icon: string;
  iconPerHour: {
    night: string;
    morning: string;
    afternoon: string;
    evening: string;
  };

  avgTemp: number;
  minTemp: number;
  maxTemp: number;

}
