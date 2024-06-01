import { Component } from '@angular/core';
import { ContainerComponent, SearchInputComponent, SelectComponent } from '@dougs/shared';

@Component({
  selector: 'lib-category',
  standalone: true,
  imports: [ContainerComponent, SearchInputComponent, SelectComponent],
  template: `
    <ui-container>
      <div class="w-full flex items-center gap-4">
        <ui-search-input class="flex-2" />
        <ui-select class="flex-1" />
      </div>
    </ui-container>
  `,
  host: {
    class: 'w-4/5',
  },
})
export class CategoryComponent {}
