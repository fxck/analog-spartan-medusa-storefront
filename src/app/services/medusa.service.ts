import { inject, Injectable, InjectionToken } from '@angular/core';
import Medusa, { Config } from '@medusajs/js-sdk';
import { from } from 'rxjs';

export const MEDUSA_CONFIG = new InjectionToken<Config>('MEDUSA_CONFIG');

export function provideMedusaConfig(config: Config) {
  return [
    {
      provide: MEDUSA_CONFIG,
      useValue: config || {
        baseUrl: ''
      }
    }
  ];
}
@Injectable({ providedIn: 'root' })
export class MedusaService {
  #sdk: Medusa;
  #medusaConfig = inject(MEDUSA_CONFIG);

  constructor() {
    this.#sdk = new Medusa({
      debug: process.env['NODE_ENV'] === 'development',
      ...this.#medusaConfig
    });
  }

  productList$() {
    return from(this.#sdk.store.product.list());
  }
}
