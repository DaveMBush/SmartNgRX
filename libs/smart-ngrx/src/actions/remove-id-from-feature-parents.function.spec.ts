import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: string[];
}

describe('removeIdFromParents()', () => {
  let parentServiceUpdateManySpy: jest.SpyInstance;
  let returnValue: string[];
  let entities: Partial<Record<string, Row>>;
  let service: ActionService;
  let parentService: ActionService;
  beforeEach(() => {
    entities = {
      '1': {
        id: '1',
        name: 'name',
        children: ['a', 'b', 'c'],
      },
      '2': {
        id: '2',
        name: 'name',
        children: ['a', 'd', 'e'],
      },
    };
    service = {
      feature: 'feature',
      entity: 'entity',
    } as unknown as ActionService;
    parentService = {
      feature: 'parentFeature',
      entity: 'parentEntity',
      updateMany: jest.fn(),
    } as unknown as ActionService;
    childDefinitionRegistry.registerChildDefinition('feature', 'entity', {
      parentField: 'children',
      childEntity: 'entity',
      childFeature: 'feature',
      parentEntity: 'parentEntity',
      parentFeature: 'parentFeature',
    } as unknown as ChildDefinition);
    parentServiceUpdateManySpy = jest
      .spyOn(parentService, 'updateMany')
      .mockImplementation(() => {
        /*noop*/
      });
  });
  describe('if the id is not in any of the entities', () => {
    beforeEach(() => {
      returnValue = replaceIdInFeatureParents(
        entities,
        service,
        parentService,
        'f',
      );
    });
    it('should return an empty array', () => {
      expect(returnValue).toEqual([]);
    });
    it("should not remove any ides from the parent's child field", () => {
      expect(parentServiceUpdateManySpy).not.toHaveBeenCalled();
    });
  });
  describe('if the id is at least one of the entities', () => {
    beforeEach(() => {
      returnValue = replaceIdInFeatureParents(
        entities,
        service,
        parentService,
        'a',
      );
    });

    it("should remove the id from the parent's child field", () => {
      expect(returnValue).toEqual(['1', '2']);
    });
    it('should return the parent ids that are affected by the delete', () => {
      expect(parentServiceUpdateManySpy).toHaveBeenCalled();
    });
  });
});
