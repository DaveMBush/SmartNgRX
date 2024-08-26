import { Dictionary } from '@ngrx/entity';

import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import * as forNextModule from './for-next.function';
import * as mergeNewRowWithExistingModule from './merge-new-row-with-existing.function';
import { mergeRowsWithEntities } from './merge-rows-with-entities.function';

interface TestRow extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('mergeRowsWithEntities', () => {
  const feature = 'testFeature';
  const entity = 'testEntity';
  let rows: TestRow[];
  let entities: Dictionary<TestRow>;
  let forNextSpy: jest.SpyInstance;
  let mergeNewRowWithExistingSpy: jest.SpyInstance;

  beforeEach(() => {
    rows = [
      { id: '1', name: 'Row 1' },
      { id: '2', name: 'Row 2' },
      { id: '3', name: 'Row 3' },
    ];
    entities = {
      '1': { id: '1', name: 'Existing 1' },
      '2': { id: '2', name: 'Existing 2' },
    };
    forNextSpy = jest.spyOn(forNextModule, 'forNext');
    mergeNewRowWithExistingSpy = jest.spyOn(
      mergeNewRowWithExistingModule,
      'mergeNewRowWithExisting',
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should merge rows with existing entities', () => {
    mergeNewRowWithExistingSpy.mockImplementation(
      (_, __, row: TestRow, existing: TestRow) => ({
        ...row,
        name: `Merged ${existing.name}`,
      }),
    );

    const result = mergeRowsWithEntities(feature, entity, rows, entities);

    expect(result).toEqual([
      { id: '1', name: 'Row 1' },
      { id: '2', name: 'Row 2' },
      { id: '3', name: 'Row 3' },
    ]);
    expect(forNextSpy).toHaveBeenCalledTimes(1);
    expect(mergeNewRowWithExistingSpy).toHaveBeenCalledTimes(2);
  });

  it('should not merge rows that do not exist in entities', () => {
    const result = mergeRowsWithEntities(feature, entity, rows, entities);

    expect(result).toEqual(rows);
    expect(forNextSpy).toHaveBeenCalledTimes(3);
    expect(mergeNewRowWithExistingSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle empty rows array', () => {
    const result = mergeRowsWithEntities(feature, entity, [], entities);

    expect(result).toEqual([]);
    expect(forNextSpy).toHaveBeenCalledTimes(1);
    expect(mergeNewRowWithExistingSpy).not.toHaveBeenCalled();
  });

  it('should handle empty entities dictionary', () => {
    const result = mergeRowsWithEntities(feature, entity, rows, {});

    expect(result).toEqual(rows);
    expect(forNextSpy).toHaveBeenCalledTimes(1);
    expect(mergeNewRowWithExistingSpy).not.toHaveBeenCalled();
  });
});
