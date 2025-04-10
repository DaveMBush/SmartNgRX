import { Dictionary } from '@ngrx/entity';
import { SmartNgRXRowBase, VirtualArrayContents } from '@smarttools/core';

import { ChildDefinition } from '../types/child-definition.interface';
import { FacadeBase } from './facade.base';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';

describe('replaceIdInFeatureParents', () => {
  let entitiesWithArray: Dictionary<SmartNgRXRowBase & { children: string[] }>;
  let entitiesWithVirtualArray: Dictionary<
    SmartNgRXRowBase & { children: VirtualArrayContents }
  >;
  let childDefinition: ChildDefinition;
  let parentService: FacadeBase;
  let updateManySpy: jest.SpyInstance;

  beforeEach(() => {
    entitiesWithArray = {};
    childDefinition = {
      parentField: 'children',
    } as unknown as ChildDefinition;
    parentService = {
      updateMany: jest.fn(),
    } as unknown as FacadeBase;
    updateManySpy = jest.spyOn(parentService, 'updateMany');
  });

  it('should return an empty array when no entities match', () => {
    const result = replaceIdInFeatureParents(
      entitiesWithArray,
      childDefinition,
      parentService,
      ['oldId', 'newId'],
    );
    expect(result).toEqual([]);
    expect(updateManySpy).not.toHaveBeenCalled();
  });

  it('should replace id in regular array children', () => {
    entitiesWithArray = {
      '1': { id: '1', children: ['oldId', 'otherId'] },
    };
    const result = replaceIdInFeatureParents(
      entitiesWithArray,
      childDefinition,
      parentService,
      ['oldId', 'newId'],
    );
    expect(result).toEqual(['1']);
    expect(updateManySpy).toHaveBeenCalledWith([
      { id: '1', changes: { children: ['newId', 'otherId'] } },
    ]);
  });

  it('should remove id when newId is null', () => {
    entitiesWithArray = {
      '1': { id: '1', children: ['oldId', 'otherId'] },
    };
    const result = replaceIdInFeatureParents(
      entitiesWithArray,
      childDefinition,
      parentService,
      ['oldId', null],
    );
    expect(result).toEqual(['1']);
    expect(updateManySpy).toHaveBeenCalledWith([
      { id: '1', changes: { children: ['otherId'] } },
    ]);
  });

  it('should replace id in VirtualArrayContents', () => {
    entitiesWithVirtualArray = {
      '1': {
        id: '1',
        children: {
          indexes: ['oldId', 'otherId'],
          length: 2,
        } as VirtualArrayContents,
      },
    };
    const result = replaceIdInFeatureParents(
      entitiesWithVirtualArray,
      childDefinition,
      parentService,
      ['oldId', 'newId'],
    );
    expect(result).toEqual(['1']);
    expect(updateManySpy).toHaveBeenCalledWith([
      {
        id: '1',
        changes: {
          children: {
            indexes: ['newId', 'otherId'],
            length: 2,
          },
        },
      },
    ]);
  });

  it('should remove id from VirtualArrayContents when newId is null', () => {
    entitiesWithVirtualArray = {
      '1': {
        id: '1',
        children: {
          indexes: ['oldId', 'otherId'],
          length: 2,
        } as VirtualArrayContents,
      },
    };
    const result = replaceIdInFeatureParents(
      entitiesWithVirtualArray,
      childDefinition,
      parentService,
      ['oldId', null],
    );
    expect(result).toEqual(['1']);
    expect(updateManySpy).toHaveBeenCalledWith([
      {
        id: '1',
        changes: {
          children: {
            indexes: ['otherId'],
            length: 1,
          },
        },
      },
    ]);
  });

  it('should handle multiple entities', () => {
    entitiesWithArray = {
      '1': { id: '1', children: ['oldId', 'otherId'] },
      '2': { id: '2', children: ['oldId', 'anotherId'] },
      '3': { id: '3', children: ['differentId'] },
    };
    const result = replaceIdInFeatureParents(
      entitiesWithArray,
      childDefinition,
      parentService,
      ['oldId', 'newId'],
    );
    expect(result).toEqual(['1', '2']);
    expect(updateManySpy).toHaveBeenCalledWith([
      { id: '1', changes: { children: ['newId', 'otherId'] } },
      { id: '2', changes: { children: ['newId', 'anotherId'] } },
    ]);
  });

  it('should not update when id is not found in children', () => {
    entitiesWithArray = {
      '1': { id: '1', children: ['differentId'] },
    };
    const result = replaceIdInFeatureParents(
      entitiesWithArray,
      childDefinition,
      parentService,
      ['oldId', 'newId'],
    );
    expect(result).toEqual([]);
    expect(updateManySpy).not.toHaveBeenCalled();
  });
});
