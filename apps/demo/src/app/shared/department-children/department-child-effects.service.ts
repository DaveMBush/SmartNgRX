import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx';

import { DocsService } from '../docs/docs.service';
import { FoldersService } from '../folders/folders.service';
import { ListsService } from '../lists/lists.service';
import { SprintFoldersService } from '../sprint-folders/sprint-folders.service';
import { DepartmentChild } from './department-child.interface';
import { filterIds } from './filter-ids.function';
import { loadByIdsForType } from './load-by-ids-for-type.function';
import { updateForType } from './update-for-type.function';
import { updateId } from './update-id-function';

@Injectable()
export class DepartmentChildEffectsService extends EffectService<DepartmentChild> {
  private doc = inject(DocsService);
  private list = inject(ListsService);
  private folder = inject(FoldersService);
  private sprintFolder = inject(SprintFoldersService);
  private sprintFolderPrefix = 'sprint-folders:';
  private sprintFolders = 'sprint-folders';
  private docPrefix = 'docs:';
  private docs = 'docs';
  private folderPrefix = 'folders:';
  private folders = 'folders';
  private listPrefix = 'lists:';
  private lists = 'lists';

  override loadByIds(ids: string[]): Observable<DepartmentChild[]> {
    const docIds = filterIds(ids, this.docPrefix);
    const folderIds = filterIds(ids, this.folderPrefix);
    const listIds = filterIds(ids, this.listPrefix);
    const sprintFolderIds = filterIds(ids, this.sprintFolderPrefix);

    const docStream = loadByIdsForType(this.doc, docIds, this.docs, 'did');

    const folderStream = loadByIdsForType(this.folder, folderIds, this.folders);
    const listStream = loadByIdsForType(this.list, listIds, this.lists);
    const sprintFolderStream = loadByIdsForType(
      this.sprintFolder,
      sprintFolderIds,
      this.sprintFolders,
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
  }

  bucketId(id: string): {
    docIds: string[];
    folderIds: string[];
    listIds: string[];
    sprintFolderIds: string[];
  } {
    const ids = [id];
    const docIds = filterIds(ids, this.docPrefix);
    const folderIds = filterIds(ids, this.folderPrefix);
    const listIds = filterIds(ids, this.listPrefix);
    const sprintFolderIds = filterIds(ids, this.sprintFolderPrefix);
    return { docIds, folderIds, listIds, sprintFolderIds };
  }

  override update(newRow: DepartmentChild): Observable<DepartmentChild[]> {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(
      newRow.id,
    );

    let updateStream: Observable<DepartmentChild[]> = of(
      [] as DepartmentChild[],
    );
    docIds.forEach((id) => {
      updateStream = updateForType(
        this.doc,
        { ...newRow, id },
        this.docs,
        'did',
      );
    });
    folderIds.forEach((id) => {
      updateStream = updateForType(
        this.folder,
        {
          ...newRow,
          id,
        },
        this.folders,
      );
    });
    listIds.forEach((id) => {
      updateStream = updateForType(this.list, { ...newRow, id }, this.lists);
    });
    sprintFolderIds.forEach((id) => {
      updateStream = updateForType(
        this.sprintFolder,
        {
          ...newRow,
          id,
        },
        this.sprintFolders,
      );
    });

    return updateStream;
  }

  override add: (row: DepartmentChild) => Observable<DepartmentChild[]> = (
    row: DepartmentChild,
  ) => {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(
      row.id,
    );

    let addStream: Observable<DepartmentChild[]> = of([] as DepartmentChild[]);
    docIds.forEach(() => {
      addStream = this.doc
        .add(row)
        .pipe(map((rows) => updateId(rows, this.docs, 'did')));
    });
    folderIds.forEach(() => {
      addStream = this.folder
        .add(row)
        .pipe(map((rows) => updateId(rows, this.folders)));
    });
    listIds.forEach(() => {
      addStream = this.list
        .add(row)
        .pipe(map((rows) => updateId(rows, this.lists)));
    });
    sprintFolderIds.forEach(() => {
      addStream = this.sprintFolder
        .add(row)
        .pipe(map((rows) => updateId(rows, this.sprintFolders)));
    });

    // need to do something here similar to updateForType except we already have the row.
    return addStream;
  };

  override delete(id: string): Observable<void> {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(id);

    let deleteStream: Observable<void> = of(undefined);
    docIds.forEach((docId) => {
      deleteStream = this.doc.delete(docId);
    });
    folderIds.forEach((folderId) => {
      deleteStream = this.folder.delete(folderId);
    });
    listIds.forEach((listId) => {
      deleteStream = this.list.delete(listId);
    });
    sprintFolderIds.forEach((sprintFolderId) => {
      deleteStream = this.sprintFolder.delete(sprintFolderId);
    });

    return deleteStream;
  }
}
