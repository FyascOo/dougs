import { Component, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface Data {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'ui-select',
  template: `
    <select
      [formControl]="optionFC"
      class="w-full flex justify-between items-center border border-light-grey rounded h-8 ">
      <option [value]="0">Tous les groupes de catégories</option>
      @for (value of data(); track $index) {
      <option [value]="value.id">{{ value.name }}</option>
      }
    </select>
  `,
})
export class SelectComponent {
  data = input<Data[]>([]);
  optionFC = new FormControl(0, { nonNullable: true });
  optionSelected = outputFromObservable(this.optionFC.valueChanges);
}
