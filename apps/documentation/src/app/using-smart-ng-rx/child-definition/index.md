# ChildDefinition

Now that we've setup our state management, the last step is being able to get the data out of the store and into our components where we can see them. This is where Smart Selectors come in.

But before we can create a selector, we need to understand the `ChildDefinitionClassic` interface. It has the following components, as outlined in the API documentation:

- childFeature - The name of the feature the child entity was registered with. We need to supply this and the childFieldName so that the code can lookup information about the entity we've already supplied from `provideSmartFeatureEntities`.

- childEntity - The name of the child entity.

- childSelector - the selector we use to retrieve the information for the child. The childSelector is an EntityState selector. This allows us to lookup an ID in the entity quickly.

- parentField - the name of the field in the parent entity that contains the IDs of the children.

- parentFeature - the feature the parent entity was registered with.

- parentEntity - the name of the parent entity.

We need the parentFeature and parentEntity so we can lookup the parent entity in the store when we need to add or delete an item. Since our parent item has the collection of IDs for the children, when we add or delete a child, we will need to add or remove the ID from the parent's collection of children. Don't worry, we handle this for you.
