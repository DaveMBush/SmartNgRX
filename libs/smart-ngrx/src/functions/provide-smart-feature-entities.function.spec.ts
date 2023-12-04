import { Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';

import { global } from '../common/global.const';
import { EffectService } from '../effects/effect-service';
import { getMarkAndDeleteInit } from '../mark-and-delete/mark-and-delete-init';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { provideSmartFeatureEntities } from './provide-smart-feature-entities.function';
import { provideSmartNgRX } from './provide-smart-ngrx.function';
import { unregisterEntity } from './register-entity.function';

interface Test extends MarkAndDelete {
  id: string;
  isDirty: boolean;
}

@Injectable()
class TestEffectsService extends EffectService<Test> {
  override load: () => Observable<Test[]> = () => {
    return of([] as Test[]);
  };

  override loadByIds: (ids: string[]) => Observable<Test[]> = (
    ids: string[],
  ) => {
    return of(ids.map((id) => ({ id, isDirty: false }) as Test));
  };
}

describe('provideSmartFeatureEntities', () => {
  let result: unknown;
  let featureName = '';
  let entityDefinition: SmartEntityDefinition<Test>;
  afterEach(() => {
    unregisterEntity(featureName, entityDefinition.fieldName);
  });

  describe('when we define a feature/entity with no mark and delete config', () => {
    beforeEach(() => {
      featureName = 'someFeature';
      entityDefinition = {
        fieldName: 'reducerName',
        effectServiceToken: new InjectionToken<TestEffectsService>(
          'TestEffectsService',
        ),
        defaultRow: (id: string) => ({ id, isDirty: false }),
      };
      const entityDefinitions: SmartEntityDefinition<MarkAndDelete>[] = [
        entityDefinition,
      ];
      // sets the default mark and delete config
      provideSmartNgRX();
      result = provideSmartFeatureEntities(
        featureName as StringLiteralSource<typeof featureName>,
        entityDefinitions,
      );
    });
    it('should provide the NgRX reducer and effect for this slice and use the global mark and delete information', () => {
      expect(result).toMatchSnapshot();
      expect(
        getMarkAndDeleteInit(`${featureName}:${entityDefinition.fieldName}`),
      ).toBe(getMarkAndDeleteInit(global));
    });
  });
  describe('when we define a feature/entity with a mark and delete config', () => {
    beforeEach(() => {
      featureName = 'someFeature';
      entityDefinition = {
        fieldName: 'reducerName',
        effectServiceToken: new InjectionToken<TestEffectsService>(
          'TestEffectsService',
        ),
        defaultRow: (id: string) => ({ id, isDirty: false }),
        markAndDelete: {
          markDirtyTime: 3000,
          removeTime: 2000,
          runInterval: 1000,
          markDirtyFetchesNew: false,
        },
      };
      const entityDefinitions: SmartEntityDefinition<MarkAndDelete>[] = [
        entityDefinition,
      ];
      // sets the default mark and delete config
      provideSmartNgRX();
      result = provideSmartFeatureEntities(
        featureName as StringLiteralSource<typeof featureName>,
        entityDefinitions,
      );
    });
    it("should provide the NgRX reducer and effect for this slice and use the entity's mark and delete information", () => {
      expect(result).toMatchSnapshot();
      expect(
        getMarkAndDeleteInit(`${featureName}:${entityDefinition.fieldName}`),
      ).toStrictEqual({
        markDirtyTime: 3000,
        removeTime: 2000,
        runInterval: 1000,
        markDirtyFetchesNew: false,
      });
    });
  });
});
