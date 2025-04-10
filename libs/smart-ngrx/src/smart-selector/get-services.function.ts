import { SmartNgRXRowBase } from '@smarttools/core';

import { FacadeBase } from '../../../smart-core/src/facades/facade.base';
import { facadeRegistry } from '../../../smart-core/src/registrations/facade-registry.class';
import { ChildDefinition } from '../../../smart-core/src/types/child-definition.interface';

/**
 * retrieves child and parent actionServices from the registry
 *
 * @param childDefinition the ChildDefinition to retrieve the services for
 * @returns the actionServices for the child and the parent
 */
export function getServices<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  childDefinition: ChildDefinition<P, C>,
): {
  service: FacadeBase<C>;
  parentService: FacadeBase<P>;
} {
  const { childFeature, childEntity, parentFeature, parentEntity } =
    childDefinition;
  const service = facadeRegistry.register(childFeature, childEntity);
  const parentService = facadeRegistry.register(parentFeature, parentEntity);
  return {
    service: service as unknown as FacadeBase<C>,
    parentService: parentService as unknown as FacadeBase<P>,
  };
}
