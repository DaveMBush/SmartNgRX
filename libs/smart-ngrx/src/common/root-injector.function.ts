import { EnvironmentInjector } from '@angular/core';

let rootInjector: EnvironmentInjector;

/**
 * Sets the root injector for the application.
 * This should be called once during application initialization.
 */
export function setRootInjector(injector: EnvironmentInjector): void {
  rootInjector = injector;
}

/**
 * Gets the root injector for the application.
 * @throws Error if the root injector hasn't been set
 */
export function getRootInjector(): EnvironmentInjector {
  if (!rootInjector) {
    throw new Error('Root injector not set. Call setRootInjector first.');
  }
  return rootInjector;
}
