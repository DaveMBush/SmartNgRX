import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { StoreEffects } from '../selector/store.effects';

/**
 * This provides and all the common SmartNgRX providers.
 *
 * @returns `EnvironmentProviders` that will get used to provide
 * the common providers to the root of the application.
 */
export function provideSmartNgRX(): EnvironmentProviders {
  return makeEnvironmentProviders([StoreEffects]);
}
