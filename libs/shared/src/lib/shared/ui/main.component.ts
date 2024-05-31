import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-main',
  template: `
    <ng-content></ng-content>
  `,
  host: { class: 'bg-grey-basic flex-1 w-full justify-center flex pb-16' },
})
export class MainComponent {}
