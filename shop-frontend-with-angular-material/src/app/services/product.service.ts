import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/product";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`).pipe(shareReplay());
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  editProduct(id: number, product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  decleteProductById(id: number){
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }
  
}
