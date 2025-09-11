import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import {
  provideSmartNgRX,
  smartErrorHandlerToken,
} from '@smarttools/smart-ngrx';

import { appRoutes } from './app.routes';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { DepartmentEffectsService } from './shared/department/department-effects.service';
import { departmentEffectsServiceToken } from './shared/department/department-effects.service-token';
import { DepartmentChildEffectsService } from './shared/department-children/department-child-effects.service';
import { departmentChildEffectsServiceToken } from './shared/department-children/department-child-effects.service-token';
import { LocationEffectsService } from './shared/locations/location-effects.service';
import { locationEffectsServiceToken } from './shared/locations/location-effects.service-token';
import { SocketService } from './shared/socket.service';
import { TopEffectsService } from './shared/top/top-effects.service';
import { topEffectsServiceToken } from './shared/top/top-effects.service-token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    {
      provide: SocketService,
      useFactory: function socketServiceFactory(): SocketService {
        const s = new SocketService();
        s.init();
        return s;
      },
    },
    {
      provide: smartErrorHandlerToken,
      useClass: ErrorHandlerService,
    },
    {
      provide: topEffectsServiceToken,
      useClass: TopEffectsService,
    },
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
    provideHttpClient(),
    importProvidersFrom(
      // we use StoreModule.forRoot({}) here because SmartNgRX uses
      // Module based providers for the features.
      StoreModule.forRoot({}),
      StoreDevtoolsModule.instrument({
        maxAge: 1,
        logOnly: false,
      }),
    ),
    // we use the provide* versions here for our own stand-alone code
    provideStore({}),
    provideEffects(),
    provideSmartNgRX({}),
    provideStoreDevtools(),
    provideRouter(appRoutes, withViewTransitions()),
  ],
};
