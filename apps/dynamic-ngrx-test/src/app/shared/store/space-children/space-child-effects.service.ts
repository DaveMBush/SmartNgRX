import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { EffectService } from '@davembush/dynamic-ngrx/effects/effect-service';

import { DocsService } from '../docs/docs.service';
import { FoldersService } from '../folders/folders.service';
import { ListsService } from '../lists/lists.service';
import { SprintFoldersService } from '../sprint-folders/sprint-folders.service';
import { filterIds } from './filter-ids.function';
import { loadByIdsForType } from './load-by-ids-for-type.function';
import { SpaceChild } from './space-child.interface';

interface CommonService {
  loadByIds(ids: string[]): Observable<Record<string, string>[]>;
}

@Injectable()
export class SpaceChildEffectsService extends EffectService<SpaceChild> {
  private doc = inject(DocsService);
  private list = inject(ListsService);
  private folder = inject(FoldersService);
  private sprintFolder = inject(SprintFoldersService);
  override load: () => Observable<SpaceChild[]> = () => {
    return of([] as SpaceChild[]);
  };

  override loadByIds: (ids: string[]) => Observable<SpaceChild[]> = (
    ids: string[]
  ) => {
    const docIds = filterIds(ids, 'docs:');
    const folderIds = filterIds(ids, 'folders:');
    const listIds = filterIds(ids, 'lists:');
    const sprintFolderIds = filterIds(ids, 'sprint-folders:');

    const docStream = loadByIdsForType(
      castTo<CommonService>(this.doc),
      docIds,
      'docs',
      'did'
    );

    const folderStream = loadByIdsForType(
      castTo<CommonService>(this.folder),
      folderIds,
      'folders'
    );
    const listStream = loadByIdsForType(
      castTo<CommonService>(this.list),
      listIds,
      'lists'
    );
    const sprintFolderStream = loadByIdsForType(
      castTo<CommonService>(this.sprintFolder),
      sprintFolderIds,
      'sprint-folders'
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
      ])
    );
  };
}
