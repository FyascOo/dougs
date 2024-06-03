import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-card',
  template: `
    @if(color().length > 0) {

    <div class="w-fit p-2 rounded-2xl" [class]="color()">
      <ng-content select="[slot=chips]"></ng-content>
    </div>
    }
    <h2>
      <ng-content select="[slot=title]"></ng-content>
    </h2>
    <div class="description">
      <ng-content select="[slot=description]"></ng-content>
    </div>
  `,
  host: {
    class:
      'cursor-pointer border rounded border-light-grey flex flex-col gap-2 p-2 hover:bg-light-grey hover:border-light-blue',
  },
  styles: [
    `
      .description {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 120%;
        color: var(--grey);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  color = input('');
}
