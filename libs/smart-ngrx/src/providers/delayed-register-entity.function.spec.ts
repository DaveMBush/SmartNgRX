import { InjectionToken } from '@angular/core';

import { globalMarkAndDeleteInit } from '../mark-and-delete/global-mark-and-delete-init.class';
import { delayedRegisterEntity } from './delayed-register-entity.function';

describe('delayedRegisterEntity', () => {
  beforeEach(() => {
    jest.spyOn(globalMarkAndDeleteInit, 'get').mockReturnValue({});
  });
  describe('when the getGlobalMarkAndDeleteInit() function returns an empty object', () => {
    it('should not call the registerEntity() function', () => {
      const returnValue = delayedRegisterEntity('featureName', 'entityName', {
        entityName: 'entityName',
        effectServiceToken: new InjectionToken<string>('fooBar'),
        defaultRow(id: string) {
          return { id };
        },
      });
      expect(returnValue).toBe(true);
    });
  });
});
