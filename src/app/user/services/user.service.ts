
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly baseUrl = 'http://localhost:4000/api/users';

    constructor(private http: HttpClient) {}

    getCurrentUser(): Observable<any> {
        return this.http.get(`${this.baseUrl}/me`);
    }
}
