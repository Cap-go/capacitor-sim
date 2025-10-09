import { WebPlugin } from '@capacitor/core';

import type { SimPlugin } from './definitions';

export class SimWeb extends WebPlugin implements SimPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
