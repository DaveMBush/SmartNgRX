import { inject, Injectable } from '@angular/core';
import { EffectService, PartialArrayDefinition } from '@smarttools/smart-signals';
import { forkJoin, map, Observable, of } from 'rxjs';

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

    const docStream =
      docIds.length > 0
        ? loadByIdsForType(this.doc, docIds, this.docs, 'did')
        : of([]);

    const folderStream =
      folderIds.length > 0
        ? loadByIdsForType(this.folder, folderIds, this.folders)
        : of([]);
    const listStream =
      listIds.length > 0
        ? loadByIdsForType(this.list, listIds, this.lists)
        : of([]);
    const sprintFolderStream =
      sprintFolderIds.length > 0
        ? loadByIdsForType(
            this.sprintFolder,
            sprintFolderIds,
            this.sprintFolders,
          )
        : of([]);

    return forkJoin({
      docs: docStream,
      folders: folderStream,
      lists: listStream,
      sprintFolders: sprintFolderStream,
    }).pipe(
      map(function loadByIdsForkJoinMap({
        docs,
        folders,
        lists,
        sprintFolders,
      }) {
        return [...docs, ...folders, ...lists, ...sprintFolders];
      }),
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
    const docService = this.doc;
    const docs = this.docs;
    docIds.forEach(function updateForTypeForEachDocId(id) {
      updateStream = updateForType(docService, { ...newRow, id }, docs, 'did');
    });
    const folderService = this.folder;
    const folders = this.folders;
    folderIds.forEach(function updateForTypeForEachFolderId(id) {
      updateStream = updateForType(
        folderService,
        {
          ...newRow,
          id,
        },
        folders,
      );
    });
    const listService = this.list;
    const lists = this.lists;
    listIds.forEach(function updateForTypeForEachListId(id) {
      updateStream = updateForType(listService, { ...newRow, id }, lists);
    });
    const sprintFolderService = this.sprintFolder;
    const sprintFolders = this.sprintFolders;
    sprintFolderIds.forEach(function updateForTypeForEachSprintFolderId(id) {
      updateStream = updateForType(
        sprintFolderService,
        {
          ...newRow,
          id,
        },
        sprintFolders,
      );
    });

    return updateStream;
  }

  override add(row: DepartmentChild): Observable<DepartmentChild[]> {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(
      row.id,
    );

    let addStream: Observable<DepartmentChild[]> = of([] as DepartmentChild[]);
    const docService = this.doc;
    const docs = this.docs;
    docIds.forEach(function addForEachDocId() {
      addStream = docService.add(row).pipe(
        map(function mapDocRows(rows) {
          return updateId(rows, docs, 'did');
        }),
      );
    });
    const folderService = this.folder;
    const folders = this.folders;
    folderIds.forEach(function addForEachFolderId() {
      addStream = folderService.add(row).pipe(
        map(function mapFolderRows(rows) {
          return updateId(rows, folders);
        }),
      );
    });
    const listService = this.list;
    const lists = this.lists;
    listIds.forEach(function addForEachListId() {
      addStream = listService.add(row).pipe(
        map(function mapListRows(rows) {
          return updateId(rows, lists);
        }),
      );
    });
    const sprintFolderService = this.sprintFolder;
    const sprintFolders = this.sprintFolders;
    sprintFolderIds.forEach(function addForEachSprintFolderId() {
      addStream = sprintFolderService.add(row).pipe(
        map(function mapSprintFolderRows(rows) {
          return updateId(rows, sprintFolders);
        }),
      );
    });

    // need to do something here similar to updateForType except we already have the row.
    return addStream;
  }

  override delete(id: string): Observable<void> {
    const { docIds, folderIds, listIds, sprintFolderIds } = this.bucketId(id);
    const docService = this.doc;
    const folderService = this.folder;
    const listService = this.list;
    const sprintFolderService = this.sprintFolder;
    let deleteStream: Observable<void> = of(undefined);
    docIds.forEach(function deleteForEachDocId(docId) {
      deleteStream = docService.delete(docId);
    });
    folderIds.forEach(function deleteForEachFolderId(folderId) {
      deleteStream = folderService.delete(folderId);
    });
    listIds.forEach(function deleteForEachListId(listId) {
      deleteStream = listService.delete(listId);
    });
    sprintFolderIds.forEach(
      function deleteForEachSprintFolderId(sprintFolderId) {
        deleteStream = sprintFolderService.delete(sprintFolderId);
      },
    );

    return deleteStream;
  }

  override loadByIndexes(
    _: string,
    __: string,
    ___: number,
    ____: number,
  ): Observable<PartialArrayDefinition> {
    // intentionally unimplemented
    throw new Error('Method not implemented.');
  }
}
