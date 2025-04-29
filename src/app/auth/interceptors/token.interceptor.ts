import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private sessionStorage: SessionStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.sessionStorage.getToken();
        let newReq = req;

        if (token) {
            newReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(newReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                }
                return throwError(() => error);
            })
        );
    }
}
