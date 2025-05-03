# Global Mark and Delete

The `MarkAndDeleteInit` property can be set as part of global registration using the `provideSmartNgRX` call.

If you don't pass anything in, the default values will be used. But each of the properties can be set to override the defaults.

Keep in mind the rules. For example, if you don't specify a value for `markDirtyTime`, but you specify a value for `removeTime` that is less than 15 minutes, the `removeTime` will be set to 30 minutes.
