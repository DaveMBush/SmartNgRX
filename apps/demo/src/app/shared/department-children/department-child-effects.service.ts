import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { EffectService } from '@smart/smart-ngrx/effects/effect-service';

import { DocsService } from '../docs/docs.service';
import { FoldersService } from '../folders/folders.service';
import { ListsService } from '../lists/lists.service';
import { SprintFoldersService } from '../sprint-folders/sprint-folders.service';
import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';
import { filterIds } from './filter-ids.function';
import { loadByIdsForType } from './load-by-ids-for-type.function';
import { updateForType } from './update-for-type.function';

@Injectable()
export class DepartmentChildEffectsService extends EffectService<DepartmentChild> {
  private doc = inject(DocsService);
  private list = inject(ListsService);
  private folder = inject(FoldersService);
  private sprintFolder = inject(SprintFoldersService);
  override load: () => Observable<DepartmentChild[]> = () => {
    return of([] as DepartmentChild[]);
  };

  private sprintFolders = 'sprint-folders:';
  private docs = 'docs:';
  private folders = 'folders:';
  private lists = 'lists:';

  override loadByIds: (ids: string[]) => Observable<DepartmentChild[]> = (
    ids: string[],
  ) => {
    const docIds = filterIds(ids, this.docs);
    const folderIds = filterIds(ids, this.folders);
    const listIds = filterIds(ids, this.lists);
    const sprintFolderIds = filterIds(ids, this.sprintFolders);

    const docStream = loadByIdsForType(this.doc, docIds, 'docs', 'did');

    const folderStream = loadByIdsForType(
      castTo<CommonService>(this.folder),
      folderIds,
      'folders',
    );
    const listStream = loadByIdsForType(
      castTo<CommonService>(this.list),
      listIds,
      'lists',
    );
    const sprintFolderStream = loadByIdsForType(
      castTo<CommonService>(this.sprintFolder),
      sprintFolderIds,
      'sprint-folders',
    );

    return forkJoin({
      docs: docStream,
      folders: folderStream,
      lists: listStream,
      sprintFolders: sprintFolderStream,
    }).pipe(
      map(({ docs, folders, lists, sprintFolders }) => [
        ...docs,
        ...folders,
        ...lists,
        ...sprintFolders,
      ]),
    );
  };

  bucketId(id: string): {
    docIds: string[];
    folderIds: string[];
    listIds: string[];
    sprintFolderIds: string[];
  } {
    const ids = [id];
    const docIds = filterIds(ids, this.docs);
    const folderIds = filterIds(ids, this.folders);
    const listIds = filterIds(ids, this.lists);
    const sprintFolderIds = filterIds(ids, this.sprintFolders);
    return { docIds, folderIds, listIds, sprintFolderIds };
  }

  override update: (
    oldRow: DepartmentChild,
    newRow: DepartmentChild,
  ) => Observable<DepartmentChild[]> = (
    oldRow: DepartmentChild,
    newRow: DepartmentChild,
  ) => {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(
      newRow.id,
    );

    let updateStream: Observable<DepartmentChild[]> = of(
      [] as DepartmentChild[],
    );
    docIds.forEach((id) => {
      updateStream = updateForType(this.doc, { ...newRow, id }, 'docs', 'did');
    });
    folderIds.forEach((id) => {
      updateStream = updateForType(
        this.folder,
        {
          ...newRow,
          id,
        },
        'folders',
      );
    });
    listIds.forEach((id) => {
      updateStream = updateForType(this.list, { ...newRow, id }, 'lists');
    });
    sprintFolderIds.forEach((id) => {
      updateStream = updateForType(
        this.sprintFolder,
        {
          ...newRow,
          id,
        },
        'sprint-folders',
      );
    });

    return updateStream.pipe(catchError((_: unknown) => of([oldRow])));
  };

  override add: (row: DepartmentChild) => Observable<DepartmentChild[]> = (
    row: DepartmentChild,
  ) => {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(
      row.id,
    );

    let addStream: Observable<DepartmentChild[]> = of([] as DepartmentChild[]);
    docIds.forEach(() => {
      addStream = this.doc.add(row);
    });
    folderIds.forEach(() => {
      addStream = this.folder.add(row);
    });
    listIds.forEach(() => {
      addStream = this.list.add(row);
    });
    sprintFolderIds.forEach(() => {
      addStream = this.sprintFolder.add(row);
    });

    return addStream;
  };
}
