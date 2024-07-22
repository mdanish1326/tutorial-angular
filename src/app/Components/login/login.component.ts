import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { passwordValidator } from '../../validations/common.validation';
import { AuthFormBase } from '../../baseClasses/auth-form.base';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatError,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends AuthFormBase {

  constructor(override fb: FormBuilder) {
    super(fb);
  }

  onSubmit() {
    console.log(this.authForm.value);
  }
}
