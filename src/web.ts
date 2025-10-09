import { WebPlugin } from '@capacitor/core';

import type { GetSimCardsResult, PermissionStatus, SimPlugin } from './definitions';

export class SimWeb extends WebPlugin implements SimPlugin {
  async getSimCards(): Promise<GetSimCardsResult> {
    throw this.unimplemented('Sim.getSimCards is not implemented on web.');
  }

  async checkPermissions(): Promise<PermissionStatus> {
    return { readSimCard: 'denied' };
  }

  async requestPermissions(): Promise<PermissionStatus> {
    return this.checkPermissions();
  }
}
