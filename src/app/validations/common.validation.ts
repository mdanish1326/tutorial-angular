import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function greaterThanZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value > 0 ? null : { greaterThanZero: true };
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return pattern.test(value) ? null : { passwordErr: true };
  };
}
