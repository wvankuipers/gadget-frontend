import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../modules/shared/services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let reason: string = error?.error?.reason;

        if (!reason && error?.statusText) {
          reason = error.statusText;
        }

        const status: number = error?.status;

        // @TODO: Show some better error messages for specific cases.
        this.notificationService.triggerNotification(`Error: ${reason} (${status})`, true);

        return throwError(error);
      })
    );
  }
}
