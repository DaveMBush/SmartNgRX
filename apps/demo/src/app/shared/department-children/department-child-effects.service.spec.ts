import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

import { DocsService } from '../docs/docs.service';
import { FoldersService } from '../folders/folders.service';
import { ListsService } from '../lists/lists.service';
import { SprintFoldersService } from '../sprint-folders/sprint-folders.service';
import { DepartmentChildEffectsService } from './department-child-effects.service';
import { loadByIdsForType } from './load-by-ids-for-type.function';

jest.mock('./load-by-ids-for-type.function');

describe('DepartmentChildEffectsService', () => {
  let service: DepartmentChildEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentChildEffectsService,
        { provide: DocsService, useValue: { loadByIds: jest.fn() } },
        { provide: FoldersService, useValue: { loadByIds: jest.fn() } },
        { provide: ListsService, useValue: { loadByIds: jest.fn() } },
        { provide: SprintFoldersService, useValue: { loadByIds: jest.fn() } },
      ],
    });

    service = TestBed.inject(DepartmentChildEffectsService);
  });

  it('should load documents, folders, lists, and sprint folders by ids', async () => {
    const ids = ['docs:1', 'folders:2', 'lists:3', 'sprint-folders:4'];
    const docResult = [{ id: 'docs:1', name: 'Doc1' }];
    const folderResult = [{ id: 'folders:2', name: 'Folder2' }];
    const listResult = [{ id: 'lists:3', name: 'List3' }];
    const sprintFolderResult = [
      { id: 'sprint-folders:4', name: 'SprintFolder4' },
    ];

    (loadByIdsForType as jest.Mock).mockImplementation((_, __, type) => {
      switch (type) {
        case 'docs':
          return of(docResult);
        case 'folders':
          return of(folderResult);
        case 'lists':
          return of(listResult);
        case 'sprint-folders':
          return of(sprintFolderResult);
        default:
          return of([]);
      }
    });

    const result = await firstValueFrom(service.loadByIds(ids));
    expect(result).toEqual([
      ...docResult,
      ...folderResult,
      ...listResult,
      ...sprintFolderResult,
    ]);
  });

  it('should return empty arrays when no ids are provided', async () => {
    const ids: string[] = [];

    const result = await firstValueFrom(service.loadByIds(ids));
    expect(result).toEqual([]);
  });

  it('should return empty arrays when no matching ids are provided', async () => {
    const ids = ['unknown:1'];

    const result = await firstValueFrom(service.loadByIds(ids));
    expect(result).toEqual([]);
  });
});
