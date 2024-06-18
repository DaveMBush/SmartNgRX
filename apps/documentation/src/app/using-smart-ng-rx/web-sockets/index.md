# WebSockets

To use SmartNgRX with WebSockets, you'll need to establish your own WebSocket connection. The only information the that you'll need to pass up to the client are which type of action needs to be performed, the table name that is impacted, and the ids of the records that are impacted.

## Updates

So, as an example, if you update the content of a row in the `users` table, you'll need to send a message to the client that might like this:

```json
{
  "action": "update",
  "table": "users",
  "ids": ["1"]
}
```

Normally, there will only be one element in the array, but we've created the APIs to handle multiple IDs in case you need to update multiple records at once.

Then you would pass this information to SmartNgRX using this code:

```typescript
import { handleSocketNotification } from '@smart/smart-ngrx/socket/handle-socket-notification.function';

handleSocketNotification(data.table, data.action, data.ids);
```

## Creates

When you add a row to the `users` table, you might think that you'd send a message the might look like this:

```json
{
  "action": "create",
  "table": "users",
  "ids": ["1"]
}
```

But, when you add a row, you'd typically add it as a child of another row, so what you really want to update is the parent row. So, you'd send a message that might look like this:

```json
{
  "action": "update",
  "table": "organizations",
  "ids": ["1"]
}
```

Where, `organizations` is the table that is the parent of the `users` table. In this case, the `ids` array would contain the id of the organizations row that is affected, not the users row.

## Deletes

Given this, you might think that deleting a row would also use the update method, but in this case it is more difficult to determine all the places the row might be referenced from, but we already know all the places it is referenced from on the client side, so we can just send a message that looks like this:

```json
{
  "action": "delete",
  "table": "users",
  "ids": ["1"]
}
```

And then we pass it to SmartNgRX using this code:

```typescript
import { handleSocketNotification } from '@smart/smart-ngrx/socket/handle-socket-notification.function';

handleSocketNotification(data.table, data.action, data.ids);
```

And SmartNgRX will take care of the rest.

## Translations

In the demo code, we have rows that we modify that aren't directly parented by tables represented in the UI. That is, on the server we have `Docs`, `Folders`, etc but they are represented in the UI as `departmentChildren`. Since good programming practice says that the server should not know how the client uses the data, what the server sends up is going to have a value for `table` that is the same as the table name on the server, and the client will have a map that maps the server table name to the client table name. In the demo code, we've mapped the table like this:

```typescript
switch (data.table) {
  case 'docs':
    data.table = 'departmentChildren';
    data.ids = data.ids.map((id) => `docs:${id}`);
    break;
  case 'lists':
    data.table = 'departmentChildren';
    data.ids = data.ids.map((id) => `lists:${id}`);
    break;
  case 'folders':
    data.table = 'departmentChildren';
    data.ids = data.ids.map((id) => `folders:${id}`);
    break;
  case 'sprintFolders':
    data.table = 'departmentChildren';
    data.ids = data.ids.map((id) => `sprint-folders:${id}`);
    break;
  default:
    break;
}
```

before we pass it on down to SmartNgRX.
