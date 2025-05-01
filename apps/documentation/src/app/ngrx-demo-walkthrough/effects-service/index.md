# Effects Services

You may have noticed when looking at the entity definition code on the previous page that there is a property that we fill in named `effectServiceToken`. As mentioned in the [Entity Definitions](/using-smart-ng-rx/entity-definitions) documentation, this is the token that we use to inject the effect service into the entity. The service that we use to interact with the server.

We use a token here because it is the cleanest way to pass an injectable in a function. It points to a class that inherits from the abstract class `EffectsService`. Our job is to implement each of the methods defined in the abstract class. We use the same set of services for each of the four tabs because how we handle refreshing and garbage collection has no impact on how we interact with the server.

## Top Effect Service

First, let's take a look at the [top-effects.service.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/top/top-effects.service.ts) file.

What you'll notice here is that we only actually implement one of the methods, `loadByIds(ids: string[])`. This is because our top level entity will only ever retrieve data from the server. While we need to provide some implementation for the other methods to fulfill the contract with the abstract class, they don't have to access the server.

## Locations Effect Service

The [locations-effects.service.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/locations/location-effects.service.ts) is more like what you will typically create for most of your enities. It implements all four methods, `loadByIds(ids: string[])`, `loadAll()`, `save(entity: Location)`, and `delete(entity: Location)` and all are relatively straightforward.

## Departments Effect Service

The [departments-effects.service.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/department/department-effects.service.ts) is similar.

## DepartmentChildren Effect Service

The [department-children-effects.service.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/department-children/department-child-effects.service.ts) is probably the most complex because it has to map the ids we are retrieving to the ids and tables we want to retrieve the data from. So, for example, the `loadByIds(ids: string[])` method filters the ids by the table they are in using the [filterIds()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/department-children/filter-ids.function.ts) function.

Once it has everything sorted, it creates a separate RxJS stream for each of the tables using the [loadByIdsForType()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/department-children/load-by-ids-for-type.function.ts) function. In this case, we do perform some error handling because we are making multiple calls to the server and we don't want to fail everything if one thing fails. You might make a different design decision in your own application.

Once we have all the streams created, we use forkJoin to call them in parallel and then create a map that combines all the results. You may wonder how these display in created order. The answer is that this data gets loaded into an NgRX entity and the order they display is determined by the order of the IDs in the field that holds the array of IDs for this entity in the parent row. We don't need to deal with order here.

### Retrieving the Department Children Data

As mentioned above, the `loadByIds(ids: string[])` function is what creates a stream for each of the tables it needs to retrieve data from. It does this by using the [CommonService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/department-children/common-service.class.ts) class. This class is created indirectly by child classes that provide details for each of the tables. See [DocsService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/docs/docs.service.ts), [FoldersService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/folders/folders.service.ts), [ListService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/lists/lists.service.ts), and [SprintFoldersService](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/sprint-folders/sprint-folders.service.ts) that do nothing more than call `super()` with the HttpClient that is injected and the path on the server to call to get the data.

> **NOTE**
> Our code does not implement any error handling because the error handling needs to bubble up to the SmartNgRX Effect that calls the service in order for optimistic updates to work correctly. However, you might consider implementing retry logic or version detection for replication lag in your own application.
