# Create (Add) a Row

By now, you should be familiar with the structure of SmartNgRX rows. A row can have zero or more children. The children are represented by a `SmartArray` object.

There are two ways you might add a new row:

If you need a row on the client that you can edit. For example, edit in place. You need to first call the `SmartArray`'s `addToStore` method, which you can access from the `SmartArray` interface, passing it a dummy row you want to add, including a unique ID.

Sample code from the demo app:

```typescript
addChild(row: DepartmentChild, parent: TreeNode): void {
  if (parent.isExpanded === false) {
    this.toggleExpand(parent);
  }

  parent.node.children.addToStore!(row, parent.node);
}
```

At this point, the row is in the store, and you can edit it like you would edit an already existing row. The only difference is that the row is not yet on the server.

To save the row to the server, you update the row in the same way you would update any other row. The system is smart enough to know that the row is new and will ultimately call the `add` method in the corresponding `EffectService`.

To remove a row that has not been saved to the server yet, you would call the `SmartArray`'s `removeFromStore` method. This will remove the row from the store and the ID from the array.

You can also add a row by calling the `SmartArray`'s `add` method. This will add the row directly to the server as well as adding it to the store.

## Storing to the Server

Once again, SmartNgRX ends up calling your `EffectService` class to store the data to the server.

```typescript
override add(row: DepartmentChild): Observable<DepartmentChild[]> {
  return this.http.post<DepartmentChild[]>(this.apiDepartments, row);
}
```

If the `add()` fails, SmartNgRX is smart enough to rollback the update in the store.
