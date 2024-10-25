# Virtual IDs

## Introduction

As we already discussed in our section on [Child Fields](/using-smart-ng-rx/crud-support/child-fields), a child field is a field that is defined on a component that points to other rows in another entity. It does this either by using a list of ids that we then use to fetch the rows from the entity. If we don't yet have the rows in the store, Smart NgRX will automatically fetch them for you.

One type of child field is the `PartialArrayDefinition`. This is used when you have a long list of children, but you don't want to fetch all the IDs at once. Instead, you can return a `PartialArrayDefinition` from your `EffectService`. This tells SmartNgRX that you are using a virtual array and will provide the IDs in chunks as you request them.

But, how do you retrieve the additional IDs when you need them?

For this, there is a method in the `EffectService` called `loadByIndexes`. This method takes a `parentId`, a `childField`, a `startIndex` and a `length`. This gives you the information you need to retrieve the next chunk of IDs.

The method should then return an observable of a `PartialArrayDefinition`. This `PartialArrayDefinition` will contain the `indexes` field which is an array of the IDs that were requested and the `length` property is the total length of the array that will eventually be in the child field.

## Sample Code

```typescript
  override loadByIndexes(
    parentId: string,
    childField: string,
    startIndex: number,
    length: number,
  ): Observable<PartialArrayDefinition> {
    return this.http.post<PartialArrayDefinition>(
      `${this.apiDepartments}/indexes`,
      {
        parentId,
        childField,
        startIndex,
        length,
      },
    );
  }
```

I realize that doesn't show you much because most of the work is done in the database. So, here's the Prisma, server side code, that does most of the work.

```typescript
  @Post('indexes')
  async getByIndexes(
    @Body()
    definition: {
      parentId: string;
      childField: string;
      startIndex: number;
      length: number;
    },
  ): Promise<{
    /** starting index for the ids to be filled into the virtual array */
    startIndex: number;
    /** the ids to put into the virtual array */
    indexes: string[];
    /** the total number of ids in the virtual array */
    length: number;
  }> {
    // there is only one child field so we can ignore that.
    const result = await this.prisma.$queryRaw`SELECT id from (
SELECT folders.departmentId, ('folders:' || folders.id) as id, folders.created FROM folders
UNION ALL SELECT docs.departmentId, ('docs:' || docs.did) as id, docs.created FROM docs
UNION ALL SELECT sprintFolders.departmentId, ('sprint-folders:' || sprintFolders.id) as id, sprintFolders.created FROM sprintFolders
UNION ALL SELECT lists.departmentId, ('lists:' || lists.id) as id, lists.created from lists)
WHERE departmentId = ${definition.parentId}
ORDER BY created
LIMIT ${definition.length} OFFSET ${definition.startIndex};`;
    const total = await this.prisma.$queryRaw`SELECT count(*) as total from (
SELECT folders.departmentId FROM folders
UNION ALL SELECT docs.departmentId FROM docs
UNION ALL SELECT sprintFolders.departmentId FROM sprintFolders
UNION ALL SELECT lists.departmentId from lists)
WHERE departmentId = ${definition.parentId};`;
    // use Number to convert BigInt
    return {
      indexes: (result as { id: string }[]).map((i) => i.id),
      startIndex: Number(definition.startIndex),
      length: Number((total as { total: unknown }[])[0].total),
    };
  }
```
