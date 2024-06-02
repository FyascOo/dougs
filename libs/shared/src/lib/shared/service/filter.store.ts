import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterStore {
  filter = signal<'alpha' | 'group'>('group');
}
