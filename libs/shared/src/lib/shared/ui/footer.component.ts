import { Component } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  selector: 'ui-footer',
  template: `
    <ui-button>Sélectionner la catégorie</ui-button>
  `,
  host: {
    class: 'fixed bottom-0 w-4/5 h-[60px] flex flex-row-reverse items-center bg-white',
  },
})
export class FooterComponent {}
