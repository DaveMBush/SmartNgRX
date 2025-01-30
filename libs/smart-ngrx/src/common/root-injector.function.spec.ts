import { EnvironmentInjector } from '@angular/core';

import { rootInjector } from './root-injector.function';

describe('RootInjector', () => {
  let mockInjector: EnvironmentInjector;

  beforeEach(() => {
    // Reset the rootInjector instance between tests
    // @ts-expect-error - Accessing private property for testing
    rootInjector.instance = undefined;
    // @ts-expect-error - Accessing private property for testing
    rootInjector.functionList = [];

    mockInjector = {} as EnvironmentInjector;
  });

  describe('get', () => {
    it('should throw error when injector not set', () => {
      expect(() => rootInjector.get()).toThrow(
        'Root injector not set. Call rootInjector.set first.',
      );
    });

    it('should return injector when set', () => {
      rootInjector.set(mockInjector);
      expect(rootInjector.get()).toBe(mockInjector);
    });
  });

  describe('runOnRootInjector', () => {
    it('should run function immediately when injector exists', () => {
      const mockFn = jest.fn();
      rootInjector.set(mockInjector);
      rootInjector.runOnRootInjector(mockFn);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should queue function when injector not set', () => {
      const mockFn = jest.fn();
      rootInjector.runOnRootInjector(mockFn);
      expect(mockFn).not.toHaveBeenCalled();
      // @ts-expect-error - Accessing private property for testing
      expect(rootInjector.functionList.length).toBe(1);
    });
  });

  describe('set', () => {
    it('should run queued functions when injector is set', () => {
      const mockFn1 = jest.fn();
      const mockFn2 = jest.fn();

      rootInjector.runOnRootInjector(mockFn1);
      rootInjector.runOnRootInjector(mockFn2);

      expect(mockFn1).not.toHaveBeenCalled();
      expect(mockFn2).not.toHaveBeenCalled();

      rootInjector.set(mockInjector);

      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).toHaveBeenCalledTimes(1);
      // @ts-expect-error - Accessing private property for testing
      expect(rootInjector.functionList.length).toBe(0);
    });
  });
});
