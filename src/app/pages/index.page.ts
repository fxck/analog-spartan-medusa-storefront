import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { MedusaService } from '../services/medusa.service';

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
  #medusa = inject(MedusaService);
  products = toSignal(this.#medusa.productList$());
}
