import { InjectionToken } from '@angular/core';
import { assert, SmartNgRXRowBase } from '@smarttools/core';

import { EffectService } from '../types/effect-service';

class ServiceRegistry {
  private readonly effectServices: Map<
    InjectionToken<EffectService<SmartNgRXRowBase>>,
    EffectService<SmartNgRXRowBase>
  > = new Map();

  register(
    token: InjectionToken<EffectService<SmartNgRXRowBase>>,
    effectService: EffectService<SmartNgRXRowBase>,
  ) {
    assert(effectService !== undefined, 'Effect service is required');
    this.effectServices.set(token, effectService);
  }

  get<T extends SmartNgRXRowBase>(token: InjectionToken<EffectService<T>>) {
    const service = this.effectServices.get(token);
    assert(!!service, 'Effect service not found');
    return service as EffectService<T>;
  }

  has(token: InjectionToken<EffectService<SmartNgRXRowBase>>) {
    return this.effectServices.has(token);
  }
}

export const serviceRegistry = new ServiceRegistry();
