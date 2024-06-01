import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-container',
  template: `
    <ng-content></ng-content>
  `,
  host: { class: 'flex flex-col items-start bg-white border rounded border-light-grey p-4 my-8' },
  styles: [
    `
      .test {
        /* Card */

        box-sizing: border-box;

        /* Auto layout */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;

        position: absolute;
        width: 1195px;
        height: 957px;
        left: 122px;
        top: 92px;

        background: #ffffff;
        /* Separator */
        border: 1px solid #dce4ed;
        border-radius: 4px;
      }
    `,
  ],
})
export class ContainerComponent {}
