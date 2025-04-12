import { InjectionToken } from '@angular/core';

import { SmartNgRXErrorHandler } from '../types/smart-ngrx-error-handler.interface';

export const smartNgRXErrorHandlerToken =
  new InjectionToken<SmartNgRXErrorHandler>('SmartNgRXErrorHandlerToken');
