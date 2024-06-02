import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent, MainComponent } from '@dougs/shared';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MainComponent, FooterComponent],
  selector: 'app-root',
  template: `
    <ui-header />
    <ui-main><router-outlet /></ui-main>
    <ui-footer />
  `,
  host: {
    class: 'flex-1 flex flex-col items-center',
  },
})
export class AppComponent {}
