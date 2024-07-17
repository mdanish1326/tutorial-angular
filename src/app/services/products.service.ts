import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get('https://fakestoreapi.com/products?limit=10');
  }

  updateProduct(id: number, product: any) {
    return this.httpClient.put('https://fakestoreapi.com/products/' + id, product);
  }
}
