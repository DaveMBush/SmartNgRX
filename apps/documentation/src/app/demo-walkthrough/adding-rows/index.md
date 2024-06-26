# Adding Rows

You may have noticed while we were looking at the code that allows for editing, that there were some variables that mentioned `add` so let's take a look at that next.

In the demo app, we only allow you to add children to Department rows. We could add rows to any SmartNgRX row, but we've kept the demo simple.

We kick off the add process in our [template file](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree.component.html#L108-L119) by calling `addChild()` specifying the current node and the type of child we want to add. Your code may only need to pass the current node. This will always be the parent of the new row.

Since this is a new row, we set the `editingContent` field to a default string that the end user can edit. More work is done in our [TreeComponentService.addChild()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L89-L97) method that determines if the node needs to be expanded and adds the row to our state (but does not send it to the server). The remainder of the code in the `tree.component.ts` file is to keep track of what we are doing in the view so that repaints don't disrupt the user's experience.

You'll notice that we cast the children to an ArrayProxy. All the childe arrays in SmartNgRX are of type `ArrayProxy`. You will probably need to cast the children arrays to type ArrayProxy in your code as well to gain access to its methods.

Similar to the edit process, `ESC` calls `cancelEdit()` and `ENTER` calls `saveNode()`. `cancelEdit()` just sets things back to the way they were [including removing the new node from the store](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L105).

[saveNode() is also similar](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/components/tree/tree.component.ts#L99-L105). But now you know why we have fields mentioning adding. Under the hood, SmartNgRX knows this is a row that needs to be added and ends up calling your Effects Service method to make that happen.
