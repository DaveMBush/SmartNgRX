import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';
import { removeIdFromFeatureParents } from './remove-id-from-feature-parents.function';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: string[];
}

describe('removeIdFromParents()', () => {
  let parentServiceUpdateManySpy: jest.SpyInstance;
  let returnValue: string[];
  let entities: Partial<Record<string, Row>>;
  let service: ActionService<SmartNgRXRowBase>;
  let parentService: ActionService<SmartNgRXRowBase>;
  beforeEach(() => {
    entities = {
      '1': {
        id: '1',
        name: 'name',
        isDirty: false,
        isEditing: false,
        children: ['a', 'b', 'c'],
      },
      '2': {
        id: '2',
        name: 'name',
        isDirty: false,
        isEditing: false,
        children: ['a', 'd', 'e'],
      },
    };
    service = {
      feature: 'feature',
      entity: 'entity',
    } as unknown as ActionService<SmartNgRXRowBase>;
    parentService = {
      feature: 'parentFeature',
      entity: 'parentEntity',
      updateMany: jest.fn(),
    } as unknown as ActionService<SmartNgRXRowBase>;
    childDefinitionRegistry.registerChildDefinition('feature', 'entity', {
      parentField: 'children',
      childEntity: 'entity' as StringLiteralSource<string>,
      childFeature: 'feature' as StringLiteralSource<string>,
      parentEntity: 'parentEntity' as StringLiteralSource<string>,
      parentFeature: 'parentFeature' as StringLiteralSource<string>,
    } as unknown as ChildDefinition);
    parentServiceUpdateManySpy = jest
      .spyOn(parentService, 'updateMany')
      .mockImplementation(() => {
        /*noop*/
      });
  });
  describe('if the id is not in any of the entities', () => {
    beforeEach(() => {
      returnValue = removeIdFromFeatureParents(
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
      returnValue = removeIdFromFeatureParents(
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
