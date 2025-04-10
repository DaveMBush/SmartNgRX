import { SmartNgRXErrorHandler } from '../../../smart-ngrx/src/types/smart-ngrx-error-handler.interface';

class ErrorHandler implements SmartNgRXErrorHandler {
  handleError(_: string, __: unknown): void {
    // noop
  }
}

export const errorHandler = new ErrorHandler();
