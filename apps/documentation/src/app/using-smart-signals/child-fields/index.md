# Child Fields

We've discussed the concept of a child field multiple times now, but we haven't gone into a lot of detail about what they are or how they work.

A child field is a field that is defined on a component that points to other rows in another entity. It does this either by using a list of ids that we then use to fetch the rows from the entity and/or retrieving the IDs based on the index of the row you are accessing. If we don't yet have the rows in the store, Smart NgRX will automatically fetch them for you.

There are two types of child fields. The first type is just a list of ids. An array of strings. For most situations this is sufficient. But if you have a long list of children, you might want to load the IDs into the array as you need them. For this you need a Child field of type `PartialArrayDefinition`. `PartialArrayDefinition` holds a list of indexes, the length of elements that will ultimately be in the array and the start position in the ultimate array that the indexes that are returned to SmartNgRX will be placed at.

SmartNgRX is smart enough to know that if you are using an Array, you have all the IDs you will ever need. If you return a `PartialArrayDefinition` from your `EffectService`, SmartNgRX will know that you are using a virtual array and will automatically fetch the rows from the server as you need them.

When you retrieve a row, you can either provide a `PartialArrayDefinition` that has the first N IDs in the array already provided in the `indexes` property, or you can provide an empty array and just provide the ultimate length of the array. Which you choose will depend on how soon you'll need those IDs and how expensive it will be to return them as part of the request for the row.

This information will be important later when we discuss [Retrieving Rows](/using-smart-signals/crud-support/retrieving).
