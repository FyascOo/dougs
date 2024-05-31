import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ui-main',
  template: `<ng-content></ng-content>`,
})
export class MainComponent {}
