import { Component, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

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
      <option [value]="null">Tous les groupes de catégories</option>
      @for (value of data(); track $index) {
      <option [value]="value.id">{{ value.name }}</option>
      }
    </select>
  `,
})
export class SelectComponent {
  data = input<Data[]>([]);
  optionFC = new FormControl<string | null>(null);
  optionSelected = outputFromObservable(
    this.optionFC.valueChanges.pipe(
      map(value => {
        if (value !== null) return +value;
        return value;
      })
    )
  );
}
