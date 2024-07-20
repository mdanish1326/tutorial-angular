import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { greaterThanZeroValidator } from '../../validations/common.validation';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  productService = inject(ProductsService)
  snackbarService = inject(SnackbarService)

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl('', [greaterThanZeroValidator()])
  });

  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe((res) => {
      if(res) {
        this.snackbarService.openSnackBar("Product added successfully!");
        this.productForm.reset();
      }
    }, (err) => {
      this.snackbarService.openSnackBar("Unable to add product!");
      console.log(err);
    })
    console.log(this.productForm.value);
  }
}
