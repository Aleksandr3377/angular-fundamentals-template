import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration-form',
    standalone: true,
    templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit {
    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    submitted = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            console.log(this.form.value);
        }
    }
}
