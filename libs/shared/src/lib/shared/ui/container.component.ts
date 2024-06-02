import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-container',
  template: `
    <ng-content></ng-content>
  `,
  host: { class: 'flex flex-col items-start bg-white border rounded border-light-grey my-8' },
})
export class ContainerComponent {}
