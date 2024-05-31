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
})
export class AppComponent {
  title = 'category-front';
}
