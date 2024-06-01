import { Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'ui-search-input',
  template: `
    <span class="material-symbols-outlined">search</span>
    <input
      [formControl]="textFC"
      type="text"
      class=" placeholder:text-black focus:outline-none focus:placeholder:text-opacity-0"
      placeholder="Rechercher une catégorie" />
  `,
  host: {
    class: 'flex items-center border border-light-grey rounded p-2 h-8',
  },
})
export class SearchInputComponent {
  textFC = new FormControl('');
  valueChanges = outputFromObservable(this.textFC.valueChanges);
}
