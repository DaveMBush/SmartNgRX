import { SmartErrorHandler } from '../types/smart-error-handler.interface';
import { errorHandler } from './error-handler.class';

class ErrorHandlerRegistry {
  private handler = errorHandler;

  register(handler: SmartErrorHandler): void {
    this.handler = handler;
  }

  getHandler(): SmartErrorHandler {
    return this.handler;
  }
}

export const errorHandlerRegistry = new ErrorHandlerRegistry();
