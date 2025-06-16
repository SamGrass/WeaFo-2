import {inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {NotificationService} from "../services/notification.service";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor {
  private readonly notificationService = inject(NotificationService);

  intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.show("Error", error.message);
        return throwError(() => error);
      })
    );
  }
}
