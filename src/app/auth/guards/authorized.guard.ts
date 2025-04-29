import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(): boolean | UrlTree {
        return this.authService.isAuthorized ? true : this.router.parseUrl('/login');
    }
}
