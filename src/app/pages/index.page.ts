import { Component, signal } from '@angular/core';
import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective
  ],
  template: `
    <h1 class="pb-4">Analog.js x Spartan x Medusa.js x Zerops.io</h1>

    <button hlmBtn>Test button</button>
  `,
  styles: `

  `,
})
export default class HomeComponent {
  count = signal(0);

  increment() {
    this.count.update((count) => count + 1);
  }
}
