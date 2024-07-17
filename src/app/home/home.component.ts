import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../services/products.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Subject, catchError, finalize, map, of, startWith } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../Components/generic-modal/generic-modal.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../model/Product.model';
import { greaterThanZeroValidator } from '../validations/common.validation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    JsonPipe,
    AsyncPipe,
    GenericModalComponent,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  @ViewChild('modalBody') modalBody!: TemplateRef<HTMLElement>;

  productService = inject(ProductsService);
  products: IProduct[] = [];
  $loading = new Subject<boolean>();
  error: string | null = null;

  productForm = new FormGroup<any>({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl('', [greaterThanZeroValidator()]),
    category: new FormControl(''),
  });

  isProductformValid$ = this.productForm.statusChanges.pipe(
    startWith(this.productForm.status),
    map(status => status === 'VALID')
  );

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.$loading.next(true);
    this.productService.getProducts().pipe(
      catchError((err) => {
        this.error = "Something went wrong";
        return of([]);
      }),
      finalize(() => this.$loading.next(false))
    ).subscribe(
      (data: any) => this.products = data
    );
  }

  onSubmit() {
    console.log(">>>", this.productForm.value);
  }

  updateProduct(id: number) {
    this.productService.updateProduct(id, this.productForm.value).subscribe(
      () => this.getProducts()
    )
  }

  openModal(product: IProduct): void {
    const id = product.id
    this.productForm.setValue({
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category
    });

    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '50%',
      data: {
        title: `Update Product Details: ${product.title}`,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        contentTemplate: this.modalBody,
        disabledConfirmBtn: this.isProductformValid$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(id);
        console.log('Confirmed', result, this.productForm.value);
      } else {
        console.log('Cancelled');
      }
    });

  }
}