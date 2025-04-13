import { Injectable } from '@angular/core';
import { SmartErrorHandler } from '@smarttools/smart-ngrx';

@Injectable()
export class ErrorHandlerService implements SmartErrorHandler {
  handleError(message: string, error: unknown): void {
    console.error(message, error);
  }
}
