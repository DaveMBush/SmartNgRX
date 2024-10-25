# Processing WebSocket Messages

The demo makes use of socket.io to send messages from the server and process them on the client. You may choose whatever framework you want, or none at all.

## Server Side

On the server side, we send messages to the client when a row changes. Some examples you can look at include:

- [Sending a message when a row has been updated](https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/server/src/app/departments/department.controller.ts#L51-L55).
- [Sending a message when a row has been added](https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/server/src/app/departments/department.controller.ts#L89-L93)
- [Sending a message when a row has been deleted](https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/server/src/app/departments/department.controller.ts#L103-L107)

### Some things to note

When we send a notification for an add, we send an `update` notification for the parent row. This is because we want the parent's child field array to be updated with the current lists of child IDs.

When we send a notification for delete, we send a `delete` notification because SmartNgRX is the best place to determine all the locations that need to be updated.

## Client Side

On the client side, we listen for the messages in one location and pass the information down to SmartNgRX to process.

The main listener code is in [socket.service.ts](https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/socket.service.ts)

The one thing to note here is that because the server is sending notifications about the tables it knows about, we need to translate the `docs`, `lists`, `folders`, and `sprintFolders` tables to `departmentChildren` so the client can process them correctly. But the main processing of the notification is all done by SmartNgRX in [handleSocketNotification()](https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/socket.service.ts#L38)
