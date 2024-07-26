import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { AuthFormBase } from '../../baseClasses/auth-form.base';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { UserMetadata } from '../../model/User.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatLabel,
    MatFormField,
    MatError,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends AuthFormBase {

  authService = inject(AuthService);
  snackbarService = inject(SnackbarService);

  constructor(override fb: FormBuilder, private router: Router) {
    super(fb);
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;
      const { exist, valid }: UserMetadata = this.authService.isUserValid(username, password);
      if (exist && valid) {
        this.snackbarService.openSnackBar('Login Successful!');
        this.router.navigate(['/']);
      } else if (!exist) {
        this.snackbarService.openSnackBar('User does not exist, Signup first!');
      } else if (!valid) {
        this.snackbarService.openSnackBar('Password is incorrect!');
      }
    }
  }
}
