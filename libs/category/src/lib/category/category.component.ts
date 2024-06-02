import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContainerComponent, SearchInputComponent, SelectComponent } from '@dougs/shared';
import { CategoryStore } from './category.store';

@Component({
  selector: 'lib-category',
  standalone: true,
  imports: [ContainerComponent, SearchInputComponent, SelectComponent],
  providers: [CategoryStore],
  template: `
    <ui-container>
      <div class="w-full flex items-center gap-4">
        <ui-search-input (valueChanges)="searchInput($event)" class="flex-2" />
        <ui-select [data]="store.group()" (optionSelected)="groupSelected($event)" class="flex-1" />
      </div>
      @for (category of store.filterCategories(); track $index) {
      <span>{{ category.wording }}</span>
      }
    </ui-container>
  `,
  host: {
    class: 'w-4/5',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  readonly store = inject(CategoryStore);

  constructor() {
    this.store.loadCategories();
  }

  searchInput(search: string) {
    this.store.updateFilterSearch(search);
  }

  groupSelected(id: number | null) {
    this.store.updateFilterGroupId(id);
  }
}
