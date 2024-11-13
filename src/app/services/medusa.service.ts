import { inject, Injectable, InjectionToken } from '@angular/core';
import MedusaSdk, { Config } from '@medusajs/js-sdk';
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
export class Medusa {
  #sdk: MedusaSdk;
  #medusaConfig = inject(MEDUSA_CONFIG);

  constructor() {
    this.#sdk = new MedusaSdk({
      debug: process.env['NODE_ENV'] === 'development',
      ...this.#medusaConfig
    });
  }

  items$() {
    return from(this.#sdk.store.product.list());
  }
}
