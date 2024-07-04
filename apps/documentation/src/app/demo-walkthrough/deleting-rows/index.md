# Deleting Rows

Last, of course, is the ability to delete rows. Delete is implemented for Departments and DepartmentChildren and is triggered by the "Delete" button in the [tree.component.html](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree.component.html#L121-L130) template. This calls the [deleteNode method in the tree.component.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree.component.ts#L90-L93) which calls down into the [deleteNode() method of the TreeComponentService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L92-L97) which calls the delete method on the node.

That's all you have to do to delete a node. All the real work is handled by SmartNgRX.

In order to access the `delete()` method of the `ProxyRow` we declare the row as implementing the `ProxyRowDelete` interface [in our CommonSourceNode interface](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/common-source-node.interface.ts#L6). If you use SmartNgRX, the row you are working with implements the `ProxyRowDelete` interface.
