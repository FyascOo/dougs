import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardComponent, ContainerComponent, SearchInputComponent, SelectComponent } from '@dougs/shared';
import { CategoryActivePipe } from './category-active.pipe';
import { CategoryStore } from './category.store';

@Component({
  selector: 'lib-category',
  standalone: true,
  imports: [ContainerComponent, SearchInputComponent, SelectComponent, CardComponent, CategoryActivePipe],
  providers: [CategoryStore],
  template: `
    <ui-container>
      <div class="w-full flex items-center gap-4 mb-4">
        <ui-search-input (valueChanges)="searchInput($event)" class="flex-2" />
        <ui-select [data]="store.group()" (optionSelected)="groupSelected($event)" class="flex-1" />
      </div>
      <div class="grid grid-cols-2">
        @for (category of store.filterCategories(); track $index) {
        <ui-card
          (click)="selectCategory(category.id)"
          [class.active]="category.id | activeCategory : selectedCategory()"
          [color]="category.group?.color ?? 'm-none'">
          <span slot="chips">{{ category.group?.name }}</span>
          <span slot="title">{{ category.wording }}</span>
          <span slot="description">{{ category.description ?? 'Non renseigné' }}</span>
        </ui-card>
        }
      </div>
    </ui-container>
  `,
  host: {
    class: 'w-4/5',
  },
  styles: [
    `
      .active {
        @apply bg-light-grey border-light-blue;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  readonly store = inject(CategoryStore);
  selectedCategory = signal(0);

  constructor() {
    this.store.loadCategories();
  }

  searchInput(search: string) {
    this.store.updateFilterSearch(search);
  }

  groupSelected(id: number | null) {
    this.store.updateFilterGroupId(id);
  }

  selectCategory(id: number) {
    this.selectedCategory.set(id);
  }
}
