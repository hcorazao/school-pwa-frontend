import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        public navCtrl: NavController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            const error = err.statusText || err.error.detail || err.error.message;
            return throwError(error);
        }))
    }
}