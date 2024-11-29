import { ActionService } from '../actions/action.service';
import { assert } from '../common/assert.function';
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
  service: ActionService;
  parentService: ActionService;
} {
  const { childFeature, childEntity, parentFeature, parentEntity } =
    childDefinition;
  const service = actionServiceRegistry.register(childFeature, childEntity);
  assert(
    !!service,
    `the service for ${childFeature}:${childEntity} is not available`,
  );
  const parentService = actionServiceRegistry.register(
    parentFeature,
    parentEntity,
  );
  assert(
    !!parentService,
    `the service for ${parentFeature}:${parentEntity} is not available`,
  );
  return { service, parentService };
}
