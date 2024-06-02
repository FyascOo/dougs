import { Component, inject } from '@angular/core';
import { FilterStore } from '../service/filter.store';
import { ActionButtonComponent } from './action-button.component';

@Component({
  standalone: true,
  imports: [ActionButtonComponent],
  selector: 'ui-header',
  template: `
    <div class="w-4/5 h-[60px] flex items-center">
      <h1 class="mr-4">Catégories</h1>
      <ui-action-button (click)="selectFilter('group')" icon="stacks" [active]="store.filter() === 'group'">
        Groupe de catégorie
      </ui-action-button>
      <ui-action-button (click)="selectFilter('alpha')" icon="sort_by_alpha" [active]="store.filter() === 'alpha'">
        Ordre alphabétique
      </ui-action-button>
    </div>
  `,
  host: {
    class: ' w-full flex justify-center',
  },
})
export class HeaderComponent {
  readonly store = inject(FilterStore);

  selectFilter(filter: 'group' | 'alpha') {
    this.store.filter.set(filter);
  }
}
