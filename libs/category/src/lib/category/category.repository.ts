import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepository {
  #http = inject(HttpClient);

  getCategories() {
    return this.#http.get<Category[]>('http://localhost:3000/all-categories');
  }

  getVisibleCategories() {
    return this.#http.get<{ id: number }[]>('http://localhost:3000/visible-categories');
  }
}
