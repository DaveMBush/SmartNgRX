import { provideHttpClient } from '@angular/common/http';
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
import { DepartmentEffectsService } from './shared/department/department-effects.service';
import { departmentEffectsServiceToken } from './shared/department/department-effects.service-token';
import { DepartmentChildEffectsService } from './shared/department-children/department-child-effects.service';
import { departmentChildEffectsServiceToken } from './shared/department-children/department-child-effects.service-token';
import { LocationEffectsService } from './shared/locations/location-effects.service';
import { locationEffectsServiceToken } from './shared/locations/location-effects.service-token';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: departmentEffectsServiceToken,
      useClass: DepartmentEffectsService,
    },
    {
      provide: departmentChildEffectsServiceToken,
      useClass: DepartmentChildEffectsService,
    },
    {
      provide: locationEffectsServiceToken,
      useClass: LocationEffectsService,
    },
    provideRouter(appRoutes, withViewTransitions()),
    provideHttpClient(),
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
      markDirtyFetchesNew: true,
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 4 * 60 * 1000,
      runInterval: 60 * 1000,
    }),
    provideAnimations(),
    provideStoreDevtools(),
  ],
};
