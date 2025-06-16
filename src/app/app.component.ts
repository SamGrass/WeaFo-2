import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import 'reflect-metadata';
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf} from "@angular/common";
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, NgbToast, NgForOf],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly notificationService = inject(NotificationService);
}
