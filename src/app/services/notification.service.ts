import {Injectable} from "@angular/core";

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
}

@Injectable({providedIn: 'root'})
export class NotificationService {
  toasts: ToastInfo[] = [];

  show(header: string, body: string) {
    this.toasts.push({header, body});
  }
}
