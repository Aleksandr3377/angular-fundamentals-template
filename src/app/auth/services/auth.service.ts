import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

const TOKEN = 'SESSION_TOKEN';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(!!this.sessionStorage.getToken());
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService,
        private router: Router
    ) {}

    get isAuthorized(): boolean {
        return this.isAuthorized$$.getValue();
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<{ token: string }>('http://localhost:4000/api/login', {
            email,
            password
        }).pipe(
            tap((res) => {
                this.sessionStorage.setToken(res.token);
                this.isAuthorized$$.next(true);
            })
        );
    }

    register(name: string, email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:4000/api/register', {
            name,
            email,
            password
        });
    }

    logout(): void {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(['/login']);
    }
}
