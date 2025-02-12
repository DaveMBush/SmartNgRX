import { ActionServiceBase } from '../actions/action.service.base';
import { actionServiceRegistry } from '../registrations/action-service-registry.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

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
  service: ActionServiceBase<C>;
  parentService: ActionServiceBase<P>;
} {
  const { childFeature, childEntity, parentFeature, parentEntity } =
    childDefinition;
  const service = actionServiceRegistry.register(childFeature, childEntity);
  const parentService = actionServiceRegistry.register(
    parentFeature,
    parentEntity,
  );
  return {
    service: service as unknown as ActionServiceBase<C>,
    parentService: parentService as unknown as ActionServiceBase<P>,
  };
}
