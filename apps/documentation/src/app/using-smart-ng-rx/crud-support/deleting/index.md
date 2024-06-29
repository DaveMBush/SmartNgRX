# Deleting a Row

Every row that is returned by SmartNgRX is wrapped in the RowProxy class which provides access to a delete() method. Calling delete() on a row will optimistically remove the row from the store, including the child arrays in every parent that references it. Then the delete method in your Effect Service will get called. If the delete method fails, the delete will be rolled back.

Sample code from the demo app:

```typescript
deleteNode(node: TreeNode): void {
  node.node.delete!();
}
```

Note: node.node is typed as `RowProxyDelete` which defines the optional delete method. Because the delete method will, by definition, be available we can safely use the non-null assertion operator `!` to call it.

Everything else happens for you under the covers.
