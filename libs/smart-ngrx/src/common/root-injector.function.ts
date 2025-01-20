import { EnvironmentInjector } from '@angular/core';

/**
 * Manages the root injector for the application.
 */
class RootInjector {
  private instance: EnvironmentInjector | undefined;

  /**
   * Sets the root injector for the application.
   * This should be called once during application initialization.
   */
  set(injector: EnvironmentInjector): void {
    this.instance = injector;
  }

  /**
   * Gets the root injector for the application.
   * @throws Error if the root injector hasn't been set
   */
  get(): EnvironmentInjector {
    if (!this.instance) {
      throw new Error('Root injector not set. Call rootInjector.set first.');
    }
    return this.instance;
  }
}

export const rootInjector = new RootInjector();
