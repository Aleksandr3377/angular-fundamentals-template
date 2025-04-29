import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private userStore: UserStoreService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userStore.isAdmin$.pipe(
            map(isAdmin => isAdmin ? true : this.router.parseUrl('/courses'))
        );
    }
}
