import { errorHandler } from './error-handler.class';
import { SmartNgRXErrorHandler } from './smart-ngrx-error-handler.interface';

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
