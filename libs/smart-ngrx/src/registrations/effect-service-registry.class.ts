import { InjectionToken } from '@angular/core';

import { EffectService } from '../effects/effect-service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { assert } from '../common/assert.function';

class EffectServiceRegistry {
  private readonly effectServices: Map<
    InjectionToken<EffectService<SmartNgRXRowBase>>,
    EffectService<SmartNgRXRowBase>
  > = new Map();

  register(
    token: InjectionToken<EffectService<SmartNgRXRowBase>>,
    effectService: EffectService<SmartNgRXRowBase>,
  ) {
    this.effectServices.set(token, effectService);
  }

  get<T extends SmartNgRXRowBase>(
    token: InjectionToken<EffectService<T>>,
  ) {
    const service = this.effectServices.get(token);
    assert(!!service, 'Effect service not found');
    return service as EffectService<T>;
  }
}

export const effectServiceRegistry = new EffectServiceRegistry();
