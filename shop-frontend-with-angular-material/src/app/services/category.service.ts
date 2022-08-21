import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = "http://localhost:8080/api/category";

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}`).pipe(shareReplay());  
  }

  getCategoryById(id: number): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category>{
    return this.http.post(`${this.baseUrl}`, category);
  }

  editCategory(id: number, category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<Category>{
    return this.http.delete<Category>(`${this.baseUrl}/${id}`);
  }

  deleteAllCategories(): Observable<Category[]>{
    return this.http.delete<Category[]>(`${this.baseUrl}`);
  }
  
}
