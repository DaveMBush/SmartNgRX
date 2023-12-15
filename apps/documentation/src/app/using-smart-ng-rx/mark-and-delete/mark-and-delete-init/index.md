# MarkAndDeleteInit

The core interface for the Mark and Delete feature is the `MarkAndDeleteInit` interface. This interface is used to configure the Mark and Delete feature for a given entity.

The `MarkAndDeleteInit` interface has the following properties:

## markDirtyTime

The time in milliseconds to wait before marking a row as dirty. When a row is marked as dirty, and it is being used it will re-retrieve the row if `markDirtyFetchesNew` is true. If `markDirtyFetchesNew` is false, it will just reset the isDirty flag in the row. his is how we know the row is still in use, or not.

If `markDirtyTime` is set to -1, then the row will never be marked as dirty, and `removeTime` will be ignored. If you manually mark a row as dirty (coming soon), the system will assume you want to refetch the row from the server, regardless of what you set here. This allows us to use the same mechanism to refresh data for automated refreshes and manual refreshes in response to websocket notification.

If `markAndDelete` is not set, it will default to 15 minutes.

## markDirtyFetchesNew

As mentioned above, if this is set to true, than any time a row is marked as dirty the system will retrieve a new value from the server. Otherwise, it will just reset the dirty timeout internally.

## removeTime

The time in milliseconds to wait before removing a row from the store. `removeTime` must be greater than `markDirtyTime`. If it is not, it will automatically set to twice `markDirtyTime`.

## runInterval

The time in milliseconds that determines how often the system looks
at the rows to see if they need to be marked dirty or removed. If
this is not set, it will default to one minute.

`runInterval` is only recognized at the global level. If you want to
change it, you must change it at the global level.
