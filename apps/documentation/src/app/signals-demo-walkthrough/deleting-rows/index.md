# Deleting Rows

Last, of course, is the ability to delete rows. Delete is implemented for Departments and DepartmentChildren and is triggered by the "Delete" button in the [tree.component.html](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/shared/components/tree/tree.component.html#L127-L134) template. This calls the [deleteNode method in the tree.component.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/shared/components/tree/tree.component.ts#L127-L129) which calls down into the [deleteNode() method of the TreeComponentService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/shared/components/tree/tree-component.service.ts#L129-L134) which calls the `delete()` method on the node.

That's all you have to do to delete a node. All the real work is handled by SmartNgRX and your `EffectService`.

In order to access the `delete()` method of the `RowProxy` we declare the row as implementing the `RowProxyDelete` interface [in our CommonSourceNode interface](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/shared/components/tree/common-source-node.interface.ts). If you use SmartNgRX, the row you are working with implements the `RowProxyDelete` interface.
