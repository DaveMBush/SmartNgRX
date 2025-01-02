import { runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { errorHandlerRegistry } from '../error-handler/error-handler-registry.class';
import { SmartNgRXErrorHandler } from '../error-handler/smart-ngrx-error-handler.interface';
import { injectablesEffect } from './injectables.effects';
import { store as storeFunction } from './store.function';

describe('injectablesEffect', () => {
  describe('when we call the effect', () => {
    let store: MockStore;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore()],
      });
      store = TestBed.inject(MockStore);
    });

    it('should call the store function', () => {
      runInInjectionContext(TestBed, () => {
        injectablesEffect(store).subscribe(() => {
          expect(storeFunction()).toBeTruthy();
        });
      });
    });

    it('should register the error handler when provided', () => {
      const mockErrorHandler: SmartNgRXErrorHandler = {
        handleError: jest.fn(),
      };

      const registerSpy = jest
        .spyOn(errorHandlerRegistry, 'register')
        .mockImplementation(() => undefined);

      runInInjectionContext(TestBed, () => {
        injectablesEffect(store, mockErrorHandler).subscribe(() => {
          expect(registerSpy).toHaveBeenCalledWith(mockErrorHandler);
        });
      });
    });
  });
});
