import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';

import { provideSmartNgRX } from '@smart/smart-ngrx/index';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withViewTransitions()),
    importProvidersFrom(
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({
        maxAge: 1,
        logOnly: false,
      }),
    ),
    provideStore({}),
    provideEffects(),
    provideSmartNgRX({
      markDirtyTime: 5 * 60 * 1000, // 5 minutes
      removeTime: 10 * 60 * 1000, // 10 minutes
      runInterval: 60000, // 1 minute
      markDirtyFetchesNew: true,
    }),
    provideAnimations(),
    provideStoreDevtools(),
  ],
};
