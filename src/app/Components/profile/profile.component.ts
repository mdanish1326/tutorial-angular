import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { AuthFormBase } from '../../baseClasses/auth-form.base';
import { MatIcon } from '@angular/material/icon';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatIcon
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends AuthFormBase implements OnInit {

  profileImage: string = '../../../assets/images/user-profile-icon.svg';

  @ViewChild('fileInput') fileInput!: ElementRef;
  localStorageService = inject(LocalStorageService);

  constructor(override fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.authForm.controls['username'].disable();
    this.authForm.addControl('email', this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]));
    this.authForm.addControl('name', this.fb.control(''));
    this.authForm.addControl('address', this.fb.control(''));
    this.authForm.addControl('additionalFields', this.fb.array([]));
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const user = this.localStorageService.get('user');
    this.authForm.patchValue(user);
  }


  // The `get` keyword in TypeScript is used to define a getter method for a property. 
  // A getter allows you to define a method that retrieves a property value, 
  // but it behaves like an ordinary property when accessed. In the context of your Angular form, 
  // using a getter for `additionalFields` provides a more convenient 
  // and readable way to access the `FormArray` from the form.
  get additionalFields(): FormArray {
    return this.authForm.get('additionalFields') as FormArray;
  }

  addField(): void {
    const field = this.fb.group({
      field: ['', Validators.required]
    });
    this.additionalFields.push(field);
  }

  removeField(index: number): void {
    this.additionalFields.removeAt(index);
  }

  onProfileImageClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  onSubmit(): void {
    if (this.authForm.valid) {
      console.log('Form Submitted', this.authForm.value);
    }
  }
}
