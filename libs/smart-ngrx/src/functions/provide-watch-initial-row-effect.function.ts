import { createEffect, FunctionalEffect } from '@ngrx/effects';

import { watchInitialRowEffect } from '../effects/effects-factory/watch-initial-row-effect.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * Adds the watchInitialRow effect to the effect if the entity is an initial row
 *
 * @param entityDefinition The entity definition to check
 * @param effects The effects to add the watchInitialRow effect to
 * @param featureName The feature name
 * @param entityName The entity name
 */
export function provideWatchInitialRowEffect<F extends string>(
  entityDefinition: SmartEntityDefinition<SmartNgRXRowBase>,
  effects: Record<string, FunctionalEffect>,
  featureName: StringLiteralSource<F>,
  entityName: string,
): void {
  /* istanbul ignore next -- trivial */
  if (entityDefinition.isInitialRow === true) {
    effects['watchInitialRow'] = createEffect(
      watchInitialRowEffect(
        featureName as StringLiteralSource<string>,
        entityName as StringLiteralSource<string>,
      ),
      { dispatch: false, functional: true },
    );
  }
}
