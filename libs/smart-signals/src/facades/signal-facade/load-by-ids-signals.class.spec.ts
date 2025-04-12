import { EnvironmentInjector, InjectionToken } from '@angular/core';
import { EntityAdapter } from '@ngrx/entity';
import {
  EffectService,
  SmartNgRXRowBase,
  SmartValidatedEntityDefinition,
} from '@smarttools/core';
import * as smartToolsCoreModule from '@smarttools/core';
import { of, throwError } from 'rxjs';

import { SignalsFacade } from '../signals-facade';
import { LoadByIdsSignals } from './load-by-ids-signals.class';

interface TestRow extends SmartNgRXRowBase {
  name: string;
  value: number;
}

// Create type-safe interfaces for our mocks
interface MockFacade {
  feature: string;
  entity: string;
  loadByIdsPreload: jest.Mock;
  loadByIdsSuccess: jest.Mock;
  storeRows: jest.Mock;
  entityState: {
    entityMap: jest.Mock;
  };
}

interface MockEffectService extends EffectService<TestRow> {
  loadByIds: jest.Mock;
}

describe('LoadByIdsSignals', () => {
  let loadByIdsSignals: LoadByIdsSignals<TestRow>;
  let mockFacade: MockFacade;
  let mockEffectService: MockEffectService;
  let mockErrorHandler: { handleError: jest.Mock };

  const feature = 'testFeature';
  const entity = 'testEntity';

  const defaultRow = (id: string): TestRow => ({
    id,
    name: `Default Row ${id}`,
    value: 0,
    isLoading: false,
  });

  beforeEach(() => {
    // Create mock for facade and its entityState
    mockFacade = {
      feature,
      entity,
      loadByIdsPreload: jest.fn(),
      loadByIdsSuccess: jest.fn(),
      storeRows: jest.fn(),
      entityState: {
        entityMap: jest.fn().mockReturnValue({}),
      },
    };

    // Mock for service registry
    mockEffectService = {
      loadByIds: jest.fn().mockReturnValue(of([])),
      loadByIndexes: jest.fn(),
      update: jest.fn(),
      add: jest.fn(),
      delete: jest.fn(),
    };

    jest
      .spyOn(smartToolsCoreModule.serviceRegistry, 'get')
      .mockReturnValue(mockEffectService);

    // Mock for entity definition registry
    const mockEntityDefinition: SmartValidatedEntityDefinition<SmartNgRXRowBase> =
      {
        effectServiceToken: new InjectionToken<EffectService<TestRow>>(
          'TestToken',
        ),
        entityName: entity,
        defaultRow: defaultRow as (id: string) => SmartNgRXRowBase,
        entityAdapter: {
          selectId: (row: SmartNgRXRowBase) => row.id,
        } as EntityAdapter<SmartNgRXRowBase>,
      };

    jest
      .spyOn(smartToolsCoreModule, 'entityDefinitionRegistry')
      .mockReturnValue(mockEntityDefinition);

    // Mock for entity rows registry
    jest
      .spyOn(smartToolsCoreModule.entityRowsRegistry, 'register')
      .mockImplementation((_, __, rows) => rows);

    // Mock for root injector and error handler
    mockErrorHandler = { handleError: jest.fn() };
    const mockGet = {
      get: jest.fn().mockReturnValue(mockErrorHandler),
      runInContext: jest.fn(),
      destroy: jest.fn(),
    } as unknown as EnvironmentInjector;

    jest
      .spyOn(smartToolsCoreModule.rootInjector, 'get')
      .mockReturnValue(mockGet);

    // Create instance of LoadByIdsSignals
    loadByIdsSignals = new LoadByIdsSignals<TestRow>(
      mockFacade as unknown as SignalsFacade<TestRow>,
    );
    loadByIdsSignals.init(defaultRow);
  });

  describe('loadByIdsDispatcher', () => {
    it('should filter out IDs with isLoading=true', async () => {
      // Setup entity map with one loading and one undefined entity
      mockFacade.entityState.entityMap.mockReturnValue({
        '1': { id: '1', isLoading: true },
        '3': { id: '3', isLoading: false },
      });

      // Mock the loadByIds to complete successfully
      mockEffectService.loadByIds.mockReturnValue(
        of([{ id: '2', name: 'Test Row 2', value: 20, isLoading: false }]),
      );

      // Call loadByIds with multiple IDs
      loadByIdsSignals.loadByIds('1');
      loadByIdsSignals.loadByIds('2');
      loadByIdsSignals.loadByIds('3');

      // Wait for the async pipeline to process
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should not have called loadByIds with ID 1 (it's loading), but should include 2 (not in map) and 3 (not loading)
      expect(mockEffectService.loadByIds).toHaveBeenCalledWith(['2', '3']);
      expect(mockFacade.loadByIdsPreload).toHaveBeenCalledWith(['2', '3']);
    });

    it('should filter out IDs that start with index or indexNoOp', async () => {
      mockFacade.entityState.entityMap.mockReturnValue({});

      loadByIdsSignals.loadByIds('1');
      loadByIdsSignals.loadByIds('index-123');
      loadByIdsSignals.loadByIds('indexNoOp-456');
      loadByIdsSignals.loadByIds('2');

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockEffectService.loadByIds).toHaveBeenCalledWith(['1', '2']);
      expect(mockFacade.loadByIdsPreload).toHaveBeenCalledWith(['1', '2']);
    });

    it('should return of([]) if no IDs remain after filtering', async () => {
      // Set up map with all entities either loading or filtered
      mockFacade.entityState.entityMap.mockReturnValue({
        '1': { id: '1', isLoading: true },
        '2': { id: '2', isLoading: true },
      });

      loadByIdsSignals.loadByIds('1');
      loadByIdsSignals.loadByIds('2');
      loadByIdsSignals.loadByIds('index-3');

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should not call the effect service or preload when no valid IDs remain
      expect(mockEffectService.loadByIds).not.toHaveBeenCalled();
      expect(mockFacade.loadByIdsPreload).not.toHaveBeenCalled();
    });

    it('should handle errors from the effect service', async () => {
      // Use throwError to create an observable that emits an error
      mockEffectService.loadByIds.mockReturnValue(
        throwError(() => new Error('Test error')),
      );

      loadByIdsSignals.loadByIds('1');

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockErrorHandler.handleError).toHaveBeenCalledWith(
        'loadByIds',
        expect.any(Error),
      );
    });
  });

  describe('loadByIdsPreload', () => {
    it('should create default rows for IDs not in the entity map', () => {
      // Setup an entity map with one existing row
      mockFacade.entityState.entityMap.mockReturnValue({
        '1': { id: '1', name: 'Existing Row', value: 10 },
      });

      // Call loadByIdsPreload with multiple IDs
      loadByIdsSignals.loadByIdsPreload(['1', '2']);

      // Should only create a default row for ID '2'
      expect(mockFacade.storeRows).toHaveBeenCalledWith([
        { id: '2', name: 'Default Row 2', value: 0, isLoading: true },
      ]);
    });
  });

  describe('loadByIdsSuccess', () => {
    it('should register rows and store them', () => {
      const rows = [
        { id: '1', name: 'Row 1', value: 10, isLoading: false },
        { id: '2', name: 'Row 2', value: 20, isLoading: false },
      ];

      const registerSpy = jest.spyOn(
        smartToolsCoreModule.entityRowsRegistry,
        'register',
      );
      loadByIdsSignals.loadByIdsSuccess(rows);

      expect(registerSpy).toHaveBeenCalledWith(feature, entity, rows);
      expect(mockFacade.storeRows).toHaveBeenCalled();
    });
  });
});
