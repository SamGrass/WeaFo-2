import {Component, inject, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DailyForecastList} from "../../models/daily-forecast-list.model";

@Component({
  selector: 'app-daily-forecast-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-forecast-table.component.html',
})
export class DailyForecastTableComponent {
  activeModal = inject(NgbActiveModal);
  @Input() dailyForecastList!: DailyForecastList;

}
