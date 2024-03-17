# Create (Add) a Row

By now, you should be familiar with the structure of SmartNgRX rows. A row can have zero or more children. The children are represented by an `ArrayProxy` object. To add a child row, you need to first call the `ArrayProxy`'s `addToStore` method, passing it a dummy row you want to add, including a unique ID. This will add the row to the store and the ID to the array.

At this point, the row is in the store and you can edit it like you would edit an already existing row. The only difference is that the row is not yet in the server.

To save the row to the server, you update the row in the same way you would update any other row. The system is smart enough to know that the row is new and will ultimately call the `add` method in the corresponding `EffectService`.
