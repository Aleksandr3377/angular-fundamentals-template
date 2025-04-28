import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { RegistrationFormComponent } from "../../../../../registration-form.component";

let fixture: ComponentFixture<RegistrationFormComponent>;
let component: RegistrationFormComponent;
let fb: FormBuilder;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ReactiveFormsModule],
    declarations: [RegistrationFormComponent],
    providers: [FormBuilder]
  }).compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(RegistrationFormComponent);
  component = fixture.componentInstance;
  fb = TestBed.inject(FormBuilder);

  component.form = fb.group({
    name: [''],
    email: [''],
    password: ['']
  });

  fixture.detectChanges();
});
