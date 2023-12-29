import { InjectionToken } from '@angular/core';

import * as getGlobalMarkAndDeleteInit from '../mark-and-delete/mark-and-delete-init';
import { delayedRegisterEntity } from './delayed-register-entity.function';

describe('delayedRegisterEntity', () => {
  beforeEach(() => {
    jest
      .spyOn(getGlobalMarkAndDeleteInit, 'getGlobalMarkAndDeleteInit')
      .mockReturnValue({});
  });
  describe('when the getGlobalMarkAndDeleteInit() function returns an empty object', () => {
    it('should not call the registerEntity() function', () => {
      const returnValue = delayedRegisterEntity('featureName', 'entityName', {
        entityName: 'entityName',
        effectServiceToken: new InjectionToken<string>('fooBar'),
        defaultRow(id: string) {
          return { id, isDirty: false };
        },
      });
      expect(returnValue).toBe(true);
    });
  });
});
