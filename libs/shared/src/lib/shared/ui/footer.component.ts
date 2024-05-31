import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-footer',
  template: `
    <span>Sélectionner la catégorie</span>
  `,
  host: {
    class: 'fixed bottom-0 w-4/5 h-[60px] flex flex-row-reverse items-center bg-white',
  },
})
export class FooterComponent {}
