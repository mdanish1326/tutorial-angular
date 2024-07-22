import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validations/common.validation';

export abstract class AuthFormBase {
	authForm!: FormGroup;

	constructor(protected fb: FormBuilder) {
		this.authForm = this.createBaseForm();
	}

	private createBaseForm(): FormGroup {
		return this.fb.group({
			username: ['', [Validators.required, Validators.minLength(5)]],
			password: ['', [Validators.required, passwordValidator()]],
		});
	}

	abstract onSubmit(): void;
}