# Intro

## Entities Under the Hood

Smart NgRX uses [NgRX Entities](https://ngrx.io/guide/entity) under the hood to manage the state of the application. This means that the state of the application is stored in a normalized way. This is a very powerful approach that allows us to easily manage the state of the application and to easily update the state of the application.

The main benefit of using Entities is that we can do lookups for existing data quickly.

Everything that Smart NgRX is doing uses standard NgRX patterns and practices with one minor exception. Smart NgRX is based on the command Action pattern rather than the event pattern. By doing this we are able to create the factories for Actions, Reducers and Effects that allow us to hide these details from you. Since you won't be actively dispatching any actions, which model we use should be immaterial to you.

Now, because this is still NgRX, any NgRX dev tools you might be using, such as the Redux Dev Tools, will still work.

## Only What you Need

Another concept you'll need to understand is that Smart NgRX only loads the data that you need. This means that if you have a page that only needs to display a list of users, then Smart NgRX will only load the users. If you have a page that needs to display a list of users and a list of roles, then Smart NgRX will load the users and the roles.

It also only loads the data when you need it. Not only does this mean that it will only load the data when you are on the page that request the data, but if you've already loaded the data, it won't load it again, unless the data has been marked dirty.

But what, exactly, does it mean for an application to "need" the data? It means that something in your code has requested it. This could be because you've requested it directly, or because you've used a selector that has requested it. This is a very powerful concept that allows us to only load the data that is needed. But what this means is that you'll want to be careful about how you access your data.

For example, as our example app demonstrates, if you are using Virtual Scrolling, you'll want to be sure you only access the data that is being displayed. Don't request every row in a list. Instead, request only the rows that are being displayed. This will ensure that your application performs as fast as possible.

## Dirty Data

There are multiple ways data might become "dirty". The first is by setting an expiration time on the data. SmartNgRX does this for you by registering the entity when we load it into the store. By setting the time, Smart NgRX will mark rows dirty when the expiration time is hit. The second is that you can mark the data dirty due to a websocket message event that indicates a row needs to be refreshed. Our API for handling websocket messages does this for you. Whenever data is marked dirty, Smart NgRX will automatically reload the data if it is currently being used or, later, when it is needed. That is, if your code is accessing the row, Smart NgRX will use the same mechanisms it originally used to get a fresh copy of the data. This all happens transparently for you under the hood.

## What this Means for Your Code

Because of the way Smart NgRX works, you'll want to be sure to take advantage of Virtual Scrolling and `@Defer()`, to ensure that you are only loading the data that you need. This will ensure that your application has the best performance possible. By doing this, you'll be able to get the benefits of Virtual Data as well as Virtual Scrolling.

It may also mean you'll want to re-think how you've structured your data. For example, imagine the situation where you have a set of fields in your row that you only display some of the time. In this case, you might want to consider moving those fields to a separate entity. This will ensure that you are only loading the data that you need.

But lets take this a bit further. Let's say each of those fields is conditionally displayed. In this case, it might make more sense to make the entity a list of fields that each relate back to the main entity. By doing this, you can retrieve and display only the fields that are being displayed.

### This reminds me of a story...

I was once tasked with interviewing a couple of programmers at a college who I had been told were the best students in their class. Since the bulk of the work they would be doing involved creating tables in a database, I asked them to model some data in a database that intentionally had multiple fields that were similar but unique. I think it was phone numbers. Home phone and cell phone for example.

What I wanted to know from this exercise was, would they model these fields in a related table or would they just dump the two fields in the same table the other fields were in?

I don't think I need to tell you what they did. They put them in the same table instead of another related table.

## Performance

You might be wondering how all this will impact performance. It is top of mind for us as well. We've added in various ways of retrieving data so that you can choose the best way to structure your data based on individual scenarios. There may be times when you want to load all the data up front. For example, lookup tables. There are other cases when you'll have a set of related entities that you want to load together rather than waiting for them to display. We've added in ways to do this as well. All while hiding the details from you and your team.

Having said that, the performance of SmartNgRX is now far beyond what I originally envisioned.
