# Deleting a Row

Every row that is returned by SmartNgRX is wrapped in the CustomProxy class which provides access to a delete() method. Calling delete() on a row will optimistically remove the row from the store, including the child arrays in every parent that references it. Then the delete method in your Effect Service will get called. If the delete method fails, the delete will be rolled back.

Sample code from the demo app:

```typescript
deleteNode(node: TreeNode): void {
  castTo<CustomProxy>(node.node).delete();
}
```

Everything else happens for you under the covers.
