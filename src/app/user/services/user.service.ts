import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}

    getUser() {
        return this.http.get(`${this.baseUrl}/users/me`);
    }
}
