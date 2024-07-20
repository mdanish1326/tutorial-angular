import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Subject, catchError, finalize, map, of, startWith } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { HeaderComponent } from '../header/header.component';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../services/snackbar.service';
import { IProduct } from '../../model/Product.model';
import { greaterThanZeroValidator } from '../../validations/common.validation';

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
    HeaderComponent,
    MatProgressSpinnerModule,
    MatPaginator
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
  @ViewChild('paginator') paginator!: MatPaginator;

  productService = inject(ProductsService);
  snackbarService = inject(SnackbarService);
  products: IProduct[] = [];
  $loading = new Subject<boolean>();
  error: string | null = null;
  totalProducts = 100;
  currentPageSize = 10;

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

  getProducts(limit: number = 10, skip: number = 0) {
    this.$loading.next(true);
    this.productService.getProducts(limit).pipe(
      catchError((err) => {
        this.error = "Something went wrong";
        return of([]);
      }),
      finalize(() => this.$loading.next(false))
    ).subscribe(
      (data: any) => this.products = data.slice(skip, limit)
    );
  }

  onSubmit() {
    console.log(">>>", this.productForm.value);
  }

  updateProduct(id: number) {
    this.productService.updateProduct(id, this.productForm.value).subscribe(
      (res) => {
        this.products = this.products.map((product) => {
          if (product.id === id) {
            return { ...product, ...this.productForm.value };
          }
          return product;
        })
        this.snackbarService.openSnackBar("Product updated successfully!");
      },
      (err) => {
        this.snackbarService.openSnackBar("Something went wrong!");
        console.log(err);
      }
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

  onPageChanged(event: PageEvent) {
    const {pageSize, pageIndex} = event;
    this.currentPageSize = pageSize;
    const limit = pageSize * (pageIndex + 1);
    const skip = pageSize * pageIndex;
    this.getProducts(limit, skip);
  }
}
