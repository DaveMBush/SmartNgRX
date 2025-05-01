# Mark and Delete

By default, the Mark and Delete mechanism in SmartNgRX will mark a row as dirty 15 minutes after it has been loaded. If the row is still being used somewhere on the screen, the system will re-request the row from the server. If the row is not being used, 15 minutes later, the row will be removed from the store. Said another way, if a row is loaded and then not used for 30 minutes, it will be removed from the store.

Up until now we haven't even mentioned Mark and Delete because it is the default. If you don't pass any parameters for Mark and Delete, this is what you get "for free".

But, you can customize the Mark and Delete behavior. Maybe you want to mark a row as dirty after 5 minutes instead of 15. Maybe you want rows to be deleted after an hour instead of 30 minutes. Maybe you don't want to re-retrieve rows from the server if they are still being used on the screen. Maybe you want to keep rows around forever.

All this can be configured.
