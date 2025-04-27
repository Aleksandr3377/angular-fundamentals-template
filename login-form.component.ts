import { Component } from '@angular/core';

@Component({
    selector: 'app-login-form',
    standalone: true,
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

    onSubmit() {
        console.log('Form submitted');
    }
}
