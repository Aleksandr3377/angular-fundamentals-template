import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmailValidatorDirective } from './directives/email.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
    declarations: [
        EmailValidatorDirective,
        DurationPipe,
        CustomDatePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EmailValidatorDirective,
        DurationPipe,
        CustomDatePipe,
    ]
})
export class SharedModule {}
