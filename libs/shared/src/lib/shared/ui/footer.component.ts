import { Component } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  selector: 'ui-footer',
  template: `
    <div class="w-4/5 flex flex-row-reverse items-center"><ui-button>Sélectionner la catégorie</ui-button></div>
  `,
  host: {
    class: 'fixed bottom-0 w-full h-[60px] bg-white py-3 flex justify-center',
  },
})
export class FooterComponent {}
