import { InjectionToken } from '@angular/core';

import { SmartErrorHandler } from '../types/smart-error-handler.interface';

export const smartErrorHandlerToken = new InjectionToken<SmartErrorHandler>(
  'SmartErrorHandlerToken',
);
