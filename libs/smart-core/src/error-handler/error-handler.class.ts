import { SmartErrorHandler } from '../types/smart-error-handler.interface';

class ErrorHandler implements SmartErrorHandler {
  handleError(_: string, __: unknown): void {
    // noop
  }
}

export const errorHandler = new ErrorHandler();
