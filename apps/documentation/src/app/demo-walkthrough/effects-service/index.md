# Effects Services

You may have noticed when looking at the entity definition code on the previous page that there is a property that we fill in named `effectServiceToken`. As mentioned in the [Entity Definitions](/using-smart-ng-rx/entity-definitions) documentation, this is the token that we use to inject the effect service into the entity. The service that we use to interact with the server.

We use a token here because it is the cleanest way to pass an injectable in a function. It points to a class that inherits from the abstract class `EffectsService`. Our job is to implement each of the four methods defined in the abstract class. We use the same set of services for each of the four tabs because how we handle refreshing and garbage collection has no impact on how we interact with the server.

First, let's take a look at the [top-effects.service.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/shared/top/top-effects.service.ts) file.

What you'll notice here is that we only actually implement one of the methods, `loadByIds(ids: string[])`. This is because our top level entity will only ever retrieve data from the server. While we need to provide some implementation for the other methods to fulfill the contract with the abstract class, they don't have to access the server.

The other odd thing you may notice about the code is that we are not implementing functions we are implementing fields of type `(ids: string[]) => Observable<T>`.
