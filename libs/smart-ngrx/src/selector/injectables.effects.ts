import { inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { functionEffectNoDispatch } from '../constants/function-effect-no-dispatch.const';
import { injectOptional } from '../constants/inject-optional.const';
import { errorHandlerRegistry } from '../error-handler/error-handler-registry.class';
import { SmartNgRXErrorHandler } from '../error-handler/smart-ngrx-error-handler.interface';
import { smartNgRXErrorHandlerToken } from '../error-handler/smart-ngrx-error-handler-token.const';
import { store as storeFunction } from './store.function';

/**
 * This is the Effect that is used to provide a store that is
 * globally accessible to the application.
 */
export const injectablesEffect = createEffect(
  function injectablesEffectFunction(
    /* istanbul ignore next -- inject() can't be called from test */
    store: Store = inject(Store),
    /* istanbul ignore next -- inject() can't be called from test */
    errorHandler: SmartNgRXErrorHandler | null = inject(
      smartNgRXErrorHandlerToken,
      injectOptional,
    ),
  ) {
    storeFunction(store);
    if (errorHandler) {
      errorHandlerRegistry.register(errorHandler);
    }
    return of(null);
  },
  functionEffectNoDispatch,
);
