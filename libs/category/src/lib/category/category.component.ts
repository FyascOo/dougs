import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardComponent, ContainerComponent, FilterStore, SearchInputComponent, SelectComponent } from '@dougs/shared';
import { CategoryActivePipe } from './pipe/category-active.pipe';
import { CategoryStore } from './store/category.store';

@Component({
  selector: 'lib-category',
  standalone: true,
  imports: [ContainerComponent, SearchInputComponent, SelectComponent, CardComponent, CategoryActivePipe],
  providers: [CategoryStore],
  template: `
    <ui-container>
      <div class="w-full flex items-center gap-4 my-4">
        <ui-search-input (valueChanges)="searchInput($event)" class="flex-2 ml-4" />
        <ui-select [data]="store.group()" (optionSelected)="groupSelected($event)" class="flex-1 mr-4" />
      </div>
      @if(filterStore.filter() === 'alpha') {
      <div class="flex flex-wrap">
        @for (category of store.filterCategories(); track $index) {
        <ui-card
          (click)="selectCategory(category.id)"
          class="w-1/2"
          [class.active]="category.id | activeCategory : selectedCategory()"
          [color]="category.group?.color ?? 'm-none'">
          <span slot="chips">{{ category.group?.name }}</span>
          <span slot="title">{{ category.wording }}</span>
          <span slot="description">{{ category.description ?? '-' }}</span>
        </ui-card>
        }
      </div>
      } @if(filterStore.filter() === 'group') { @for (group of store.filterGroupedCategories(); track $index) {
      <div class="w-full p-1" [class]="group.color ?? 'm-none'">{{ group.name }}</div>
      <div class="w-full flex flex-wrap">
        @for (category of group.categories; track $index) {
        <ui-card
          (click)="selectCategory(category.id)"
          class="w-1/2"
          [class.active]="category.id | activeCategory : selectedCategory()">
          <span slot="title">{{ category.wording }}</span>
          <span slot="description">{{ category.description ?? '-' }}</span>
        </ui-card>
        }
      </div>
      } }
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
  readonly filterStore = inject(FilterStore);
  selectedCategory = signal(0);

  constructor() {
    this.store.loadCategories();
  }

  searchInput(search: string) {
    this.store.updateFilterSearch(search);
  }

  groupSelected(id: number) {
    this.store.updateFilterGroupId(id);
  }

  selectCategory(id: number) {
    if (this.selectedCategory() === id) {
      this.selectedCategory.set(0);
    } else {
      this.selectedCategory.set(id);
    }
  }
}
