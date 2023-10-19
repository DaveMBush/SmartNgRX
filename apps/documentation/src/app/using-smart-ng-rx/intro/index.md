# Intro

## Entities Under the Hood

Smart NgRX uses NgRX Entities under the hood to manage the state of the application. This means that the state of the application is stored in a normalized way. This is a very powerful approach that allows us to easily manage the state of the application and to easily update the state of the application.

The main benefit of using Entities is that we can do lookups for existing data quickly.

Everything that Smart NgRX is doing uses standard NgRX patterns and practices with one minor exception. Smart NgRX is based on the command Action pattern rather than the event pattern. By doing this we are able to create the factories for Actions, Reducers and Effects that allow us to hide these details from you.

However, because this is still NgRX, any NgRX dev tools you might be using, such as the Redux Dev Tools, will still work.

## Only What you Need

Another concept you'll need to understand is that Smart NgRX only loads the data that you need. This means that if you have a page that only needs to display a list of users, then Smart NgRX will only load the users. If you have a page that needs to display a list of users and a list of roles, then Smart NgRX will load the users and the roles.

It also only loads the data when you need it. Not only does this mean that it will only navigate the data when you are on the page that request the data, but if you've already loaded the data, it won't load it again, unless the data has been marked dirty (coming soon).

## Dirty Data

There are multiple ways data might become "dirty". The first is by setting an expiration time on the data. This can be done when we register the entity using the `provideSmartFeatureEntities` method. By setting the time, Smart NgRX will mark rows dirty when the expiration time is hit. The second is that you can mark the data dirty for any number of reasons. The main one might be because a websocket message was received that indicates the data needs to be refreshed. Whenever data is marked dirty, Smart NgRX will automatically reload the data if or when it is needed. That is, if your code is accessing the row, Smart NgRX will use the same mechanisms it originally used to get a fresh copy of the data.

## What this Means for Your Code

Because of the way Smart NgRX works, you'll want to be sure to take advantage of Virtual Scrolling and, once Angular 17 is released, `@Defer()`, to ensure that you are only loading the data that you need. This will ensure that your application is as performant as possible. By doing this, you'll be able to get the benefits of Virtual Data as well as Virtual Scrolling.

It may also mean you'll want to re-think how you've structured your data. For example, imagine the situation where you've a set of fields in your row that you only display some of the time. In this case, you might want to consider moving those fields to a separate entity. This will ensure that you are only loading the data that you need.

But lets take this a bit further. Let's say each of those fields is conditionally displayed. In this case, it might make more sense to make the entity a list of fields that each relate back to the main entity. By doing this, you can retrieve and display only the rows that are being displayed.

## Performance

You might be wondering how all this will impact performance. It is top of mind for us as well. We will be adding in various ways of retrieving data so that you can choose the best way to structure your data based on individual scenarios. There may be times when you want to load all the data up front. For example, lookup tables. There are other cases when you'll have a set of related entities that you want to load together rather than waiting for them to display. We'll be adding in ways to do this as well. All while hiding the details from you and your team.
