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

  override loadByIds: (ids: string[]) => Observable<DepartmentChild[]> = (
    ids: string[],
  ) => {
    const docIds = filterIds(ids, 'docs:');
    const folderIds = filterIds(ids, 'folders:');
    const listIds = filterIds(ids, 'lists:');
    const sprintFolderIds = filterIds(ids, 'sprint-folders:');

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

  override update: (
    oldRow: DepartmentChild,
    newRow: DepartmentChild,
  ) => Observable<DepartmentChild[]> = (
    oldRow: DepartmentChild,
    newRow: DepartmentChild,
  ) => {
    const ids = [newRow.id];
    const docIds = filterIds(ids, 'docs:');
    const folderIds = filterIds(ids, 'folders:');
    const listIds = filterIds(ids, 'lists:');
    const sprintFolderIds = filterIds(ids, 'sprint-folders:');

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
}
