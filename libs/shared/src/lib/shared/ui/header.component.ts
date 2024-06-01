import { Component } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';

@Component({
  standalone: true,
  imports: [ActionButtonComponent],
  selector: 'ui-header',
  template: `
    <div class="w-4/5 h-[60px] flex items-center">
      <h1>Catégories</h1>
      <ui-action-button icon="stacks" [active]="true">Groupe de catégorie</ui-action-button>
      <ui-action-button icon="sort_by_alpha">Ordre alphabétique</ui-action-button>
    </div>
  `,
  host: {
    class: ' w-full flex justify-center',
  },
})
export class HeaderComponent {}
