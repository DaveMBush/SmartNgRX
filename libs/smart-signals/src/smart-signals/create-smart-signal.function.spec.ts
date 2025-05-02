import { signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import {
  FacadeBase,
  facadeRegistry,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';

import { SignalsFacade } from '../signal-facade/signals-facade';
import { ChildDefinitionSignals } from '../types/child-definition-signals.interface';
import { createSmartSignal } from './create-smart-signal.function';

jest.mock('../../../smart-core/src/registrations/facade-registry.class');

interface TestEntity extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('createSmartSignal', () => {
  let mockFacade: jest.Mocked<SignalsFacade<TestEntity>>;
  let registerSpy: jest.SpyInstance;

  beforeEach(() => {
    mockFacade = {
      entityState: {
        ids: jest.fn().mockReturnValue(['1', '2']),
        entityMap: jest.fn().mockReturnValue({
          '1': { id: '1', name: 'Test 1' },
          '2': { id: '2', name: 'Test 2' },
        }),
      },
    } as unknown as jest.Mocked<SignalsFacade<TestEntity>>;

    registerSpy = jest
      .spyOn(facadeRegistry, 'register')
      .mockReturnValue(mockFacade as unknown as FacadeBase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create signal when given feature and entity strings', () => {
    const result = createSmartSignal('testFeature', 'testEntity');

    expect(registerSpy).toHaveBeenCalledWith('testFeature', 'testEntity');
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
  });

  it('should create signal when given parent signal and children array', () => {
    const parentSignal = signal<EntityState<TestEntity>>({
      ids: ['1'],
      entities: { '1': { id: '1', name: 'Parent' } },
    });

    const children: ChildDefinitionSignals<TestEntity, TestEntity>[] = [
      {
        parentFeature: 'testFeature',
        parentEntity: 'testEntity',
        childFeature: 'childFeature',
        childEntity: 'childEntity',
        parentField: 'parentId',
        childSelector: signal<EntityState<TestEntity>>({
          ids: [],
          entities: {},
        }),
      },
    ];

    const result = createSmartSignal(parentSignal, children);
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
  });

  it('should throw error for invalid arguments', () => {
    expect(() =>
      // @ts-expect-error Testing invalid arguments
      createSmartSignal(null, undefined),
    ).toThrow('Invalid arguments');
  });
});
