import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}

    getCurrentUser() {
        return this.http.get(`${this.baseUrl}/users/me`);
    }
}
