jest.mock('../../registrations/entity-definition-registry.function');

import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { entityDefinitionRegistry } from '../../registrations/entity-definition-registry.function';
import { serviceRegistry } from '../../registrations/service-registry.class';
import { EffectService } from '../../types/effect-service';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { Update } from './update.class';

/** Initial value for numeric fields */
const initialValue = 0;

/** First update value */
const firstUpdateValue = 1;

/** Second update value */
const secondUpdateValue = 2;

/** Empty array length */
const emptyLength = 0;

/** Empty start index */
const emptyStartIndex = 0;

/** Common status values */
const pendingStatus = 'pending';
const activeStatus = 'active';

/** Common description values */
const updatedDescription = 'updated description';
const row1InitialDescription = 'row 1 initial';
const row2InitialDescription = 'row 2 initial';
const row2ModifiedDescription = 'row 2 modified';

/** Common row names */
const row1UpdatedName = 'Row 1 Updated';
const row2UpdatedName = 'Row 2 Updated';

interface TestRow extends SmartNgRXRowBase {
  id: string;
  name: string;
  value: number;
  status: string;
  description: string;
}

class MockEffectService extends EffectService<TestRow> {
  override loadByIds = jest.fn().mockReturnValue(of([]));

  override loadByIndexes = jest.fn().mockReturnValue(
    of({
      rows: [],
      startIndex: emptyStartIndex,
      length: emptyLength,
      indexes: [],
    }),
  );

  override update = jest.fn().mockReturnValue(of([]));

  override add = jest.fn().mockReturnValue(of([]));

  override delete = jest.fn().mockReturnValue(of(undefined));
}

const mockEffectServiceToken = new InjectionToken<EffectService<TestRow>>(
  'MockEffectService',
);

describe('Update', () => {
  let update: Update<TestRow>;
  let mockEffectService: MockEffectService;
  let mockLoadByIdsSuccess: jest.Mock;
  let entityAdapter: EntityAdapter<TestRow>;
  let testScheduler: TestScheduler;

  const verifyUpdateSequence = (updates: TestRow[]): void => {
    const mockUpdate = mockEffectService.update;
    const mockSuccess = mockLoadByIdsSuccess;

    const verifyCall = (row: TestRow, callNumber: number): void => {
      expect(mockUpdate).toHaveBeenNthCalledWith(callNumber, row);
      expect(mockSuccess).toHaveBeenNthCalledWith(callNumber, [row]);
    };

    expect(mockUpdate).toHaveBeenCalledTimes(updates.length);
    expect(mockSuccess).toHaveBeenCalledTimes(updates.length);

    updates.forEach((row, index) => {
      verifyCall(row, index + 1);
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    mockEffectService = new MockEffectService();
    mockLoadByIdsSuccess = jest.fn();

    jest.spyOn(serviceRegistry, 'get').mockReturnValue(mockEffectService);

    (entityDefinitionRegistry as jest.Mock).mockReturnValue({
      effectServiceToken: mockEffectServiceToken,
    });

    entityAdapter = createEntityAdapter<TestRow>();
  });

  it('should debounce multiple updates to the same row', () => {
    testScheduler.run(({ cold, hot, flush }) => {
      const originalRow: TestRow = {
        id: '1',
        name: 'Initial',
        value: initialValue,
        status: pendingStatus,
        description: 'initial description',
      };

      const firstUpdate: TestRow = {
        ...originalRow,
        name: 'First Update',
        status: 'in-progress',
      };

      const secondUpdate: TestRow = {
        ...firstUpdate,
        name: 'Second Update',
        description: updatedDescription,
      };

      // Mock the effect service to return the updates
      mockEffectService.update
        .mockReturnValueOnce(cold('a|', { a: [firstUpdate] }))
        .mockReturnValueOnce(cold('b|', { b: [secondUpdate] }));

      // Initialize the update service
      update = new Update<TestRow>(
        'testFeature',
        'testEntity',
        entityAdapter,
        mockLoadByIdsSuccess,
      );
      update.init();

      // Create a promise to track the updates
      let updateCount = 0;
      mockLoadByIdsSuccess.mockImplementation(() => {
        updateCount++;
      });

      // Simulate rapid updates
      // '-a----b' means: first update at frame 1, second update at frame 6
      hot('-a----b').subscribe({
        next: (frame) => {
          if (frame === 'a') {
            update.update(originalRow, firstUpdate);
          } else {
            update.update(firstUpdate, secondUpdate);
          }
        },
      });

      // Let the scheduler process all events
      flush();

      // Verify the debounced updates
      expect(updateCount).toBe(2);
      verifyUpdateSequence([firstUpdate, secondUpdate]);
    });
  });

  it('should merge updates to the same row within debounce time', () => {
    testScheduler.run(({ cold, hot, flush }) => {
      const row: TestRow = {
        id: '1',
        name: 'Initial',
        value: initialValue,
        status: pendingStatus,
        description: 'initial description',
      };

      // First update changes name and value
      const update1: TestRow = {
        ...row,
        name: 'Update 1',
        value: firstUpdateValue,
      };

      // Second update changes status and description
      const update2: TestRow = {
        ...update1,
        status: activeStatus,
        description: updatedDescription,
      };

      // Third update changes name again and value
      const update3: TestRow = {
        ...update2,
        name: 'Final Name',
        value: secondUpdateValue,
      };

      // Expected result should have all latest values
      const expectedMergedUpdate: TestRow = {
        ...row,
        name: 'Final Name',
        value: secondUpdateValue,
        status: activeStatus,
        description: updatedDescription,
      };

      mockEffectService.update.mockReturnValueOnce(
        cold('a|', { a: [expectedMergedUpdate] }),
      );

      update = new Update<TestRow>(
        'testFeature',
        'testEntity',
        entityAdapter,
        mockLoadByIdsSuccess,
      );
      update.init();

      let updateCount = 0;
      mockLoadByIdsSuccess.mockImplementation(() => {
        updateCount++;
      });

      // Send three updates within 1ms of each other
      hot('-(abc)', { a: update1, b: update2, c: update3 }).subscribe(
        (updateRow) => {
          update.update(row, updateRow);
        },
      );

      flush();

      expect(updateCount).toBe(1);
      expect(mockEffectService.update).toHaveBeenCalledWith(
        expectedMergedUpdate,
      );
    });
  });

  it('should update multiple different rows within debounce time with multiple field changes', () => {
    testScheduler.run(({ cold, hot, flush }) => {
      const row1: TestRow = {
        id: '1',
        name: 'Row 1',
        value: initialValue,
        status: pendingStatus,
        description: row1InitialDescription,
      };

      const row2: TestRow = {
        id: '2',
        name: 'Row 2',
        value: initialValue,
        status: pendingStatus,
        description: row2InitialDescription,
      };

      // Multiple field updates for row1
      const update1: TestRow = {
        ...row1,
        name: row1UpdatedName,
        value: firstUpdateValue,
        status: activeStatus,
      };

      // Multiple field updates for row2
      const update2: TestRow = {
        ...row2,
        name: row2UpdatedName,
        description: row2ModifiedDescription,
        value: secondUpdateValue,
      };

      mockEffectService.update
        .mockReturnValueOnce(cold('a|', { a: [update1] }))
        .mockReturnValueOnce(cold('b|', { b: [update2] }));

      update = new Update<TestRow>(
        'testFeature',
        'testEntity',
        entityAdapter,
        mockLoadByIdsSuccess,
      );
      update.init();

      let updateCount = 0;
      mockLoadByIdsSuccess.mockImplementation(() => {
        updateCount++;
      });

      // Send updates to different rows within 1ms
      hot('-(ab)', { a: update1, b: update2 }).subscribe((updateRow) => {
        if (updateRow.id === '1') {
          update.update(row1, updateRow);
        } else {
          update.update(row2, updateRow);
        }
      });

      flush();

      expect(updateCount).toBe(2);
      verifyUpdateSequence([update1, update2]);
    });
  });

  it('should update multiple different rows after debounce time', () => {
    testScheduler.run(({ cold, hot, flush }) => {
      const row1: TestRow = {
        id: '1',
        name: 'Row 1',
        value: initialValue,
        status: pendingStatus,
        description: row1InitialDescription,
      };

      const row2: TestRow = {
        id: '2',
        name: 'Row 2',
        value: initialValue,
        status: pendingStatus,
        description: row2InitialDescription,
      };

      const update1: TestRow = {
        ...row1,
        name: row1UpdatedName,
        status: activeStatus,
      };

      const update2: TestRow = {
        ...row2,
        name: row2UpdatedName,
        description: row2ModifiedDescription,
      };

      mockEffectService.update
        .mockReturnValueOnce(cold('a|', { a: [update1] }))
        .mockReturnValueOnce(cold('b|', { b: [update2] }));

      update = new Update<TestRow>(
        'testFeature',
        'testEntity',
        entityAdapter,
        mockLoadByIdsSuccess,
      );
      update.init();

      let updateCount = 0;
      mockLoadByIdsSuccess.mockImplementation(() => {
        updateCount++;
      });

      // Send updates to different rows with time gap
      hot('-a--b').subscribe((frame) => {
        if (frame === 'a') {
          update.update(row1, update1);
        } else {
          update.update(row2, update2);
        }
      });

      flush();

      expect(updateCount).toBe(2);
      verifyUpdateSequence([update1, update2]);
    });
  });

  it('should handle concurrent updates to different rows', () => {
    testScheduler.run(({ cold, hot, flush }) => {
      const row1: TestRow = {
        id: '1',
        name: 'Row 1',
        value: initialValue,
        status: pendingStatus,
        description: row1InitialDescription,
      };

      const row2: TestRow = {
        id: '2',
        name: 'Row 2',
        value: initialValue,
        status: pendingStatus,
        description: row2InitialDescription,
      };

      const row1Update: TestRow = {
        ...row1,
        name: row1UpdatedName,
        status: activeStatus,
      };

      const row2Update: TestRow = {
        ...row2,
        name: row2UpdatedName,
        description: row2ModifiedDescription,
      };

      // Mock the effect service to return the updates
      mockEffectService.update
        .mockReturnValueOnce(cold('a|', { a: [row1Update] }))
        .mockReturnValueOnce(cold('b|', { b: [row2Update] }));

      // Initialize the update service
      update = new Update<TestRow>(
        'testFeature',
        'testEntity',
        entityAdapter,
        mockLoadByIdsSuccess,
      );
      update.init();

      // Create a promise to track the updates
      let updateCount = 0;
      mockLoadByIdsSuccess.mockImplementation(() => {
        updateCount++;
      });

      // Simulate concurrent updates to different rows
      // '-ab' means: first row update at frame 1, second row update at frame 2
      hot('-ab').subscribe({
        next: (frame) => {
          if (frame === 'a') {
            update.update(row1, row1Update);
          } else {
            update.update(row2, row2Update);
          }
        },
      });

      // Let the scheduler process all events
      flush();

      // Verify the updates were processed correctly
      expect(updateCount).toBe(2);
      verifyUpdateSequence([row1Update, row2Update]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
