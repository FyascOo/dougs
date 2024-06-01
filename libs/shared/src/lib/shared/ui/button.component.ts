import { Component, output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-button',
  template: `
    <button (click)="action.emit()" class="button">
      <span class="text"><ng-content></ng-content></span>
    </button>
  `,
  styles: [
    `
      .button {
        padding: 7.5px 12px;
        gap: 6px;
        background: var(--light-blue);
        border-radius: 4px;
      }

      .text {
        font-weight: 700;
        font-size: 14px;
        color: white;
      }
    `,
  ],
})
export class ButtonComponent {
  action = output();
}
