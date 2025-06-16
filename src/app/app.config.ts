import {ApplicationConfig} from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {inject} from "@angular/core";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([(req, next)=>inject(ErrorInterceptor).intercept(req, next)]),
    )
  ],
}
