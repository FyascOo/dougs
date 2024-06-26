import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
      class="cursor-pointer flex justify-between items-center border border-light-grey rounded h-8">
      <option [value]="0">Tous les groupes de catégories</option>
      @for (value of data(); track $index) {
      <option [value]="value.id">{{ value.name }}</option>
      }
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  data = input<Data[]>([]);
  optionFC = new FormControl<string>('0', { nonNullable: true });
  optionSelected = outputFromObservable(this.optionFC.valueChanges.pipe(map(value => +value)));
}
