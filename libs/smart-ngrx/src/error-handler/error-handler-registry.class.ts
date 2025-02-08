import { SmartNgRXErrorHandler } from '../types/smart-ngrx-error-handler.interface';
import { errorHandler } from './error-handler.class';

class ErrorHandlerRegistry {
  private handler = errorHandler;

  register(handler: SmartNgRXErrorHandler): void {
    this.handler = handler;
  }

  getHandler(): SmartNgRXErrorHandler {
    return this.handler;
  }
}

export const errorHandlerRegistry = new ErrorHandlerRegistry();
