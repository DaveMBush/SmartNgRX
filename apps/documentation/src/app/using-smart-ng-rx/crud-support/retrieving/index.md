# Retrieving Rows

## Introduction

SmartNgRX expects every row within an entity that has children to have an array of IDs that point to the children. By using the `createSmartSelector` function, you will automatically get the children of the row you are retrieving when you access the array element. You will not need to dispatch any actions for this to happen. It will just work.

See the [Smart Selectors](/using-smart-ng-rx/smart-selectors) section for more information.

## Effects Service

What you will need to provide is the effects service that will retrieve the rows from the server. You will need to implement the `loadByIds` method. This method will be called with the list of IDs the code has determined it does not yet have or have been marked as dirty and it needs to render on the screen some place.

Keep in mind that any time you access an array element directly, you will trigger the retrieval process for that row. This is by design. If you want to retrieve the ID and not the row, you can use the array's `rawArray` property. You might use this if you are iterating through the array for the purposes of virtual scrolling as we've done in the example code.

## Sample Code

Here is a sample implementation of a `loadByIds` method from the SmartNgRX Demo application:

```typescript
  override loadByIds: (ids: string[]) => Observable<Department[]> = (
    ids: string[],
  ) => {
    return this.http.post<Department[]>('./api/departments', ids).pipe(
      map((departments) => addIsDirty(departments) as Department[]),
      map(childrenTransform),
    );
  };
```

You might notice that we are using a POST instead of a GET to retrieve the data. If you prefer, you can use a GET. We've chosen to use a POST because we can send a list of IDs to the server and we want that list of IDs to be as large as needed and not limited by the URL size restrictions inherent in using GET.

## addIsDirty

You'll also notice the call to `addIsDirty`. This is a function we use to add in the `isDirty` property to each row. This is a property that is used by SmartNgRX to determine if the row needs to be retrieved from the server.

## Dealing with children that are from multiple entities

One interesting problem you might run into is that you might need to retrieve children from multiple entities (that then retrieve from the server if they don't exist). This is, in part what the `childrenTransform` function is for. It will take the children from the server and transform them into the correct entity type so we can redirect to the right end point when we retrieve the data.

If you have a use case like this, we invite you to examine the Demo application to see how we've handled this issue. This is one of several ways you might handle the problem. You might also consider handling this on the server.

## Retrieving the top level store

At this time, we've not implemented a cleaver way to retrieve the top level store in your application, so you'll need to retrieve that yourself. We are working on a way to do that aligns with how the rest of SmartNgRX works.

You can, however, use the actions and reducers we create by calling `createAction` to create the actions and registering the entity using `provideSmartFeatureEntities`.

You can see how we've implemented this by looking at the Location code in the Demo application.
