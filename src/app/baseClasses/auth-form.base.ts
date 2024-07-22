import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validations/common.validation';

export abstract class AuthFormBase {
	authForm!: FormGroup;

	constructor(protected fb: FormBuilder) {
		this.authForm = this.createBaseForm();
	}

	private createBaseForm(): FormGroup {
		return this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [passwordValidator()]]
		});
	}

	abstract onSubmit(): void;
}