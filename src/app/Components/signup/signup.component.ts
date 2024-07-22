import { Component, OnInit } from '@angular/core';
import { AuthFormBase } from '../../baseClasses/auth-form.base';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatError,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent extends AuthFormBase {

  constructor(override fb: FormBuilder) {
    super(fb);
    this.addSignupFields();
  }

  private addSignupFields() {
    this.authForm.addControl('email',
      this.fb.control('', [Validators.required, Validators.email])
    );
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);
    }
  }
}
