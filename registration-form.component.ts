import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration-form',
    standalone: true,
    templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent {
    registrationForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }
}
