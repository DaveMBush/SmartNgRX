export interface SmartNgRXErrorHandler {
  handleError(message: string, error: unknown): void;
}
