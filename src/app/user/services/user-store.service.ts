import {UserService} from "@app/user/services/user.service";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserStoreService {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {}

    getUser() {
        this.userService.getUser().subscribe((user: any) => {
            this.name$$.next(user.name);
            this.isAdmin$$.next(user.role === 'admin');
        });
    }
}
