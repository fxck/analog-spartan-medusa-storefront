import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import /* Medusa, */ { Config } from '@medusajs/js-sdk';
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
  // #sdk: Medusa;
  #medusaConfig = inject(MEDUSA_CONFIG);
  #http = inject(HttpClient);

  // constructor() {
  //   console.log(this.#medusaConfig);
  //   this.#sdk = new Medusa({
  //     debug: import.meta.env['NODE_ENV'] === 'development',
  //     ...this.#medusaConfig
  //   });
  // }

  productList$() {
    return this.#http.get(
      `${this.#medusaConfig.baseUrl}/store/products`,
      {
        headers: {
          'x-publishable-api-key': this.#medusaConfig.publishableKey || ''
        }
      }
    );

    // return from(this.#sdk.store.product.list());
  }

}
