import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-header',
  template: `
    <div class="w-4/5 h-[60px] flex items-center">
      <span>Catégories</span>
      <button>Groupe de catégorie</button>
      <button>Ordre alphabétique</button>
    </div>
  `,
  host: {
    class: ' w-full flex justify-center',
  },
})
export class HeaderComponent {}
