import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  addProduct(product: any) {
    return this.httpClient.post('https://fakestoreapi.com/products', product);
  }

  getProducts(limit: number) {
    return this.httpClient.get(`https://fakestoreapi.com/products?limit=${limit}`);
  }

  updateProduct(id: number, product: any) {
    return this.httpClient.put('https://fakestoreapi.com/products/' + id, product);
  }
}
