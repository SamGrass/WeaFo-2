import {Type} from "class-transformer";
import * as dayjs from "dayjs";

class Coordinates {
  lat!: number;
  lon!: number;
}

export class CityModel {

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
