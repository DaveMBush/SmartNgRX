import { EnvironmentInjector } from '@angular/core';

/**
 * Manages the root injector for the application.
 */
class RootInjector {
  private instance: EnvironmentInjector | undefined;
  private functionList: (() => void)[] = [];

  /**
   * Sets the root injector for the application.
   * This should be called once during application initialization.
   *
   * @param injector the root injector set by initialization provider
   */
  set(injector: EnvironmentInjector): void {
    this.instance = injector;
    this.runAll();
  }

  /**
   * Gets the root injector for the application.
   *
   * @throws Error if the root injector hasn't been set
   * @returns the root injector
   */
  get(): EnvironmentInjector {
    if (!this.instance) {
      throw new Error('Root injector not set. Call rootInjector.set first.');
    }
    return this.instance;
  }

  /**
   * Registers a function to run when the root injector
   * is available.
   *
   * @param fn The function to run.
   */
  runOnRootInjector(fn: () => void): void {
    if (this.instance) {
      fn();
      return;
    }
    this.functionList.push(fn);
  }

  /**
   * Runs all the functions that were registered to run
   * when the root injector is available.
   */
  runAll(): void {
    this.functionList.forEach(function runFunction(fn) {
      fn();
    });
    this.functionList = [];
  }
}

export const rootInjector = new RootInjector();
