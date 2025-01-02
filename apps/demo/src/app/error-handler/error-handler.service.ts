import { Injectable } from '@angular/core';
import { SmartNgRXErrorHandler } from '@smarttools/smart-ngrx';

@Injectable()
export class ErrorHandlerService implements SmartNgRXErrorHandler {
  handleError(message: string, error: unknown): void {
    console.error(message, error);
  }
}
