# Updating Fields

We trigger editing of the node labels by [clicking on the edit icon](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree.component.html#L95) which triggers our [editNode()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree.component.ts#L121-L124) method in the tree.component.ts file.

Notice that we save which node we are editing so that if a repaint occurs, we don't stop editing. We also save off the current content so that if we cancel out of the edit, we can set things back to the way they were.

This then loads our edit component that we've created where we can make the changes. If we press `ESC` while editing, it fires our [cancelEdit()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree.component.ts#L130-L132) method which sets everything back to the way it was.

When we press `ENTER`, it triggers our [saveNode()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree.component.ts#L134-L143) method. This undoes the edit state of our presentation and then stores the editingContent field into the node's name field. Updating the node's name field optimistically updates the field and eventually triggers the Effects Service to update the server.
