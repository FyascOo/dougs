import { Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-action-button',
  template: `
    <button (click)="action.emit()" class="button" [class.active]="active()">
      @if(icon()) {
      <span class="material-symbols-outlined">{{ icon() }}</span>
      }
      <span class="text"><ng-content></ng-content></span>
    </button>
  `,
  styles: [
    `
      .button {
        padding: 8px;
        gap: 8px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .active {
        background-color: var(--light-grey);
        color: var(--light-blue);
      }

      .text {
        font-weight: 600;
      }
    `,
  ],
})
export class ActionButtonComponent {
  icon = input<null | string>(null);
  active = input(false);
  action = output();
}
