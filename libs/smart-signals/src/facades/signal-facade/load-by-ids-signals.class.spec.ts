import { Observable, of, throwError } from 'rxjs';

import { SignalsFacade } from '../signals-facade';
import { LoadByIdsSignals } from './load-by-ids-signals.class';

// Define a MockRow interface to avoid importing SmartNgRXRowBase
interface MockRow {
  id: string;
  isLoading: boolean;
}

// Create mock factory outside of jest.mock to avoid initialization issues
const createMockRow = (id: string, isLoading = false): MockRow => ({
  id,
  isLoading,
});

// Create a loaded mock row factory
const createMockLoadedRow = (id: string): MockRow => createMockRow(id, true);

// Define types for our mocks
type JestMock = jest.Mock;

interface CoreMock {
  bufferIds: JestMock;
  defaultRows: JestMock;
  entityDefinitionRegistry: JestMock;
  entityRowsRegistry: {
    register: JestMock;
  };
  mergeRowsWithEntities: JestMock;
  rootInjector: {
    get: JestMock;
  };
  serviceRegistry: {
    get: JestMock;
  };
}

// Mock dependencies using inline implementations rather than function calls
jest.mock('@smarttools/core', () => ({
  // Core functionality mocks
  bufferIds: jest.fn(
    () => (source: Observable<string>) =>
      source.pipe(
        // Properly buffer and emit values as an array
        (s) =>
          new Observable((subscriber) => {
            const buffer: string[] = [];
            const subscription = s.subscribe({
              next: (value: string) => {
                buffer.push(value);
                // Emit buffer immediately for test purposes
                subscriber.next([...buffer]);
              },
              error: (err: unknown) => subscriber.error(err),
              complete: () => subscriber.complete(),
            });
            return () => subscription.unsubscribe();
          }),
      ),
  ),
  defaultRows: jest.fn(() => [createMockRow('id1')]),
  entityDefinitionRegistry: jest.fn(() => ({
    effectServiceToken: 'testToken',
  })),
  entityRowsRegistry: { register: jest.fn(() => [createMockLoadedRow('id1')]) },
  mergeRowsWithEntities: jest.fn((feature, entity, rows: MockRow[]) => {
    // Make return type explicit to avoid unsafe any return
    return Array.isArray(rows) ? rows : [];
  }),
  // Inline implementation for rootInjector to avoid reference errors
  rootInjector: {
    get: jest.fn(() => ({
      get: jest.fn(() => ({
        handleError: jest.fn(),
      })),
    })),
  },
  serviceRegistry: { get: jest.fn() },
}));

// Now define the MockRowImpl class after the jest.mock call
class MockRowImpl implements MockRow {
  id: string;
  isLoading: boolean;

  constructor(id: string, isLoading = false) {
    this.id = id;
    this.isLoading = isLoading;
  }
}

describe('LoadByIdsSignals', () => {
  // Define types for our facade mock
  interface MockSignalsFacade {
    feature: string;
    entity: string;
    loadByIdsPreload: jest.Mock;
    loadByIdsSuccess: jest.Mock;
    storeRows: jest.Mock;
    entityState: {
      entityMap: jest.Mock;
    };
  }

  let signalsFacade: MockSignalsFacade;
  let loadByIdsSignals: LoadByIdsSignals<MockRow>;
  let mockEffectService: { loadByIds: jest.Mock };
  let coreMock: CoreMock;

  // Helper function to create a default row
  const createDefaultRow = (id: string): MockRow => new MockRowImpl(id);

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create effect service mock
    mockEffectService = { loadByIds: jest.fn() };

    // Get core module mock
    coreMock = jest.requireMock('@smarttools/core');
    coreMock.serviceRegistry.get.mockReturnValue(mockEffectService);

    // Mock SignalsFacade
    signalsFacade = {
      feature: 'testFeature',
      entity: 'testEntity',
      loadByIdsPreload: jest.fn(),
      loadByIdsSuccess: jest.fn(),
      storeRows: jest.fn(),
      entityState: {
        entityMap: jest.fn().mockReturnValue({}),
      },
    };

    // Initialize with default row factory - use type assertion to satisfy TypeScript
    loadByIdsSignals = new LoadByIdsSignals<MockRow>(
      signalsFacade as unknown as SignalsFacade<MockRow>,
    );
    loadByIdsSignals.init(createDefaultRow);
  });

  describe('notAPreloadId function', () => {
    // Test internal notAPreloadId function by observing loadByIdsPreload calls

    it('should filter out ids starting with "index-"', () => {
      // Using loadByIds to invoke the internal notAPreloadId function
      loadByIdsSignals.loadByIds('index-123');

      // Should not call loadByIdsPreload for filtered IDs
      expect(signalsFacade.loadByIdsPreload).not.toHaveBeenCalled();
    });

    it('should filter out ids starting with "indexNoOp-"', () => {
      loadByIdsSignals.loadByIds('indexNoOp-123');

      // Should not call loadByIdsPreload for filtered IDs
      expect(signalsFacade.loadByIdsPreload).not.toHaveBeenCalled();
    });

    it('should process normal ids', async () => {
      // Setup the mock effect service to return an empty array
      mockEffectService.loadByIds.mockReturnValue(of([]));

      // Call loadByIds with a normal ID that should pass through the filter
      loadByIdsSignals.loadByIds('normal-123');

      // Wait for async operations to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Should pass normal IDs through to loadByIdsPreload
      expect(signalsFacade.loadByIdsPreload).toHaveBeenCalledWith([
        'normal-123',
      ]);
    });
  });

  describe('loadByIdsDispatcher', () => {
    it('should filter out ids that are already loading', () => {
      // Branch: Entity exists and is already loading
      const entities = {
        id1: { id: 'id1', isLoading: true } as MockRow,
      };
      signalsFacade.entityState.entityMap.mockReturnValue(entities);

      // Reset to reinitialize the dispatcher with the new mocked entity state
      loadByIdsSignals = new LoadByIdsSignals<MockRow>(
        signalsFacade as unknown as SignalsFacade<MockRow>,
      );
      loadByIdsSignals.init(createDefaultRow);

      loadByIdsSignals.loadByIds('id1');

      // Should not attempt to load already loading entities
      expect(mockEffectService.loadByIds).not.toHaveBeenCalled();
    });

    it('should load entities that exist but are not loading', () => {
      // Branch: Entity exists but is not loading
      const entities = {
        id1: { id: 'id1', isLoading: false } as MockRow,
      };
      signalsFacade.entityState.entityMap.mockReturnValue(entities);
      mockEffectService.loadByIds.mockReturnValue(of([new MockRowImpl('id1')]));

      loadByIdsSignals = new LoadByIdsSignals<MockRow>(
        signalsFacade as unknown as SignalsFacade<MockRow>,
      );
      loadByIdsSignals.init(createDefaultRow);

      loadByIdsSignals.loadByIds('id1');

      // Should attempt to load entities that exist but aren't loading
      expect(mockEffectService.loadByIds).toHaveBeenCalled();
    });

    it('should immediately return if no ids remain after filtering', () => {
      // Branch: No IDs remain after filtering (preload IDs and already loading IDs)
      mockEffectService.loadByIds.mockReturnValue(of([]));

      // Using a preload ID which will be filtered out
      loadByIdsSignals.loadByIds('index-123');

      // Effect service should not be called when no IDs remain
      expect(mockEffectService.loadByIds).not.toHaveBeenCalled();
    });

    it('should call effectService.loadByIds with filtered ids', () => {
      // Branch: Normal flow with multiple IDs
      const testRows = [new MockRowImpl('id1'), new MockRowImpl('id2')];
      mockEffectService.loadByIds.mockReturnValue(of(testRows));

      loadByIdsSignals.loadByIds('id1');
      loadByIdsSignals.loadByIds('id2');

      // Should call loadByIds with the correct IDs
      expect(mockEffectService.loadByIds).toHaveBeenCalledWith(['id1', 'id2']);
    });

    it('should call loadByIdsSuccess when effect service returns rows', () => {
      // Branch: Success flow
      const testRows = [new MockRowImpl('id1'), new MockRowImpl('id2')];
      mockEffectService.loadByIds.mockReturnValue(of(testRows));

      loadByIdsSignals.loadByIds('id1');

      // Should call loadByIdsSuccess with the returned rows
      expect(signalsFacade.loadByIdsSuccess).toHaveBeenCalledWith(testRows);
    });

    it('should handle errors from effect service', () => {
      // Branch: Error flow
      const testError = new Error('Test error');
      mockEffectService.loadByIds.mockReturnValue(throwError(() => testError));

      // Type-safe error handler access
      const errorHandler = {
        handleError: jest.fn(),
      };
      const injector = {
        get: jest.fn().mockReturnValue(errorHandler),
      };
      coreMock.rootInjector.get.mockReturnValue(injector);

      loadByIdsSignals.loadByIds('id1');

      // Should call error handler with the error
      expect(errorHandler.handleError).toHaveBeenCalledWith(
        'loadByIds',
        testError,
      );
    });
  });

  describe('loadByIdsPreload', () => {
    it('should create default rows for non-existent entities', () => {
      // Branch: Creating default rows
      coreMock.defaultRows.mockClear();

      loadByIdsSignals.loadByIdsPreload(['id1', 'id2']);

      // Should call defaultRows to create rows for the IDs
      expect(coreMock.defaultRows).toHaveBeenCalled();
      // Should store the rows
      expect(signalsFacade.storeRows).toHaveBeenCalled();
    });

    it('should merge rows with existing entities', () => {
      // Branch: Merging with entities
      coreMock.mergeRowsWithEntities.mockClear();

      loadByIdsSignals.loadByIdsPreload(['id1']);

      // Should merge with existing entities
      expect(coreMock.mergeRowsWithEntities).toHaveBeenCalled();
    });
  });

  describe('loadByIdsSuccess', () => {
    it('should register rows with entity registry', () => {
      // Branch: Registering rows
      const testRows = [new MockRowImpl('id1')];

      loadByIdsSignals.loadByIdsSuccess(testRows);

      // Should register rows with the entity registry
      expect(coreMock.entityRowsRegistry.register).toHaveBeenCalledWith(
        'testFeature',
        'testEntity',
        testRows,
      );
    });

    it('should merge registered rows with entities', () => {
      // Branch: Merging registered rows
      const testRows = [new MockRowImpl('id1')];
      coreMock.mergeRowsWithEntities.mockClear();

      loadByIdsSignals.loadByIdsSuccess(testRows);

      // Should merge registered rows with entities
      expect(coreMock.mergeRowsWithEntities).toHaveBeenCalled();
    });

    it('should store the merged rows', () => {
      // Branch: Storing merged rows
      const testRows = [new MockRowImpl('id1')];

      loadByIdsSignals.loadByIdsSuccess(testRows);

      // Should store the merged rows
      expect(signalsFacade.storeRows).toHaveBeenCalled();
    });
  });
});
