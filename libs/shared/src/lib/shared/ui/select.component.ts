import { Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'ui-select',
  template: `
    <select class="w-full flex justify-between items-center border border-light-grey rounded h-8 ">
      <option disabled selected>Tous les groupes de catégories</option>
      <option>Han Solo</option>
      <option>Greedo</option>
    </select>
  `,
})
export class SelectComponent {
  textFC = new FormControl('');
  valueChanges = outputFromObservable(this.textFC.valueChanges);
}
