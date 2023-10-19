import { InjectionToken } from '@angular/core';

import { EffectService } from '../effects/effect-service';

/**
 * Shorthand type for the token used to inject the effect service
 */
export type EffectServiceToken<Row> = InjectionToken<EffectService<Row>>;
