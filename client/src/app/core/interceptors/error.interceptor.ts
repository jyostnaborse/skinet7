import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log(error.status);
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error; // this is to send Validstion error back to component in order to show it on form
            }
            else {
              this.toastr.error(error.error.message, error.status.toString())
            }
          }
          if (error.status === 404) {
            this.router.navigateByUrl("/not-found");
          }
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            this.router.navigateByUrl("/server-error", navigationExtras);
          }
        }
        return throwError(() => new Error(error.message))

      })
    )
  }
}
