import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepository {
  #http = inject(HttpClient);

  getCategories() {
    return this.#http.get('http://localhost:3000/all-categories');
  }

  getVisibleCategories() {
    return this.#http.get('http://localhost:3000/visible-categories');
  }
}
