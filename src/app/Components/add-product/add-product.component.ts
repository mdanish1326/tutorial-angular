import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { greaterThanZeroValidator } from '../../validations/common.validation';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../services/snackbar.service';
import { IDeactivateGuard } from '../../guards/deactive.guard';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements IDeactivateGuard {

  @ViewChild('modalBody') modalBody!: TemplateRef<HTMLElement>;
  modalSubtitle: string = 'Your changes will be lost.';

  productService = inject(ProductsService)
  snackbarService = inject(SnackbarService)

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl('', [greaterThanZeroValidator()])
  });

  constructor(private dialog: MatDialog) { }

  openModal() {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Are you sure you want to leave this page?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        contentTemplate: this.modalBody,
        disabledConfirmBtn: false
      }
    });
    return dialogRef.afterClosed();
  }


  canExit() {
    if (this.productForm.dirty) {
      return this.openModal()
    }
    return true;
  }

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
