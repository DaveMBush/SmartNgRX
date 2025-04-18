import { errorHandlerRegistry } from './error-handler-registry.class';

/**
 * function that allows us to log errors to the client
 *
 * @param message the message to log
 * @param error the error to log
 */
export function handleError(message: string, error: unknown): void {
  errorHandlerRegistry.getHandler().handleError(message, error);
}
