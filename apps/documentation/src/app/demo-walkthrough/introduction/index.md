# Introduction

The demo application is meant to be a set of examples of how SmartNgRX works and what it can do. It demonstrates the following concepts:

- Using the Angular Material Tree component and the CDK Virtual Scroll component, it demonstrates how to only load the data that is needed to display the part of the tree you can see.
- How to use the SmartNgRX library to manage the state of the application. (CRUD operations).
- How to implement web socket server to client communication.
- The various ways to handle refreshing and garbage collecting NgRX data (or not).

It was primarily built as a way to test the various features as they were built and we will add to it as more features are added or we find a need to demonstrate more features. One that quickly comes to mind is demonstrating the ability to have multiple parents of a row. This should work, but we've not yet tested it extensively.

## Tabs

Other than the main tab that describes each of the demo tabs, there are four tabs that each demonstrate a different way of managing state using SmartNgRX.

- **Tree (Standard):** This tab demonstrates the default Mark and Delete strategy that SmartNgRX uses.
  - **markDirtyTime:** Marks a row as dirty every 15 minutes.
  - **markDirtyFetchesNew:** Uses the default of `true` to fetch new data when a row is marked dirty.
  - **removeTime:** Removes a row from memory if it is still dirty 15 minutes after being marked dirty.
  - **runInterval:** Uses the default polling interval of 1 minute to mark rows dirty or remove them from memory.
- **Tree (No Refresh):** This tab demonstrates the No Refresh strategy that SmartNgRX can use. It also overrides the times to 2 minutes and 4 minutes. Instead of refreshing the data every 2 minutes, it does nothing. Later on, it removes the row if it hasn't been rendered 2 minutes after the last time it would have been marked dirty. While it doesn't refresh when it is marked dirty, it does act as though it did.
  - **markDirtyTime:** Marks a row as dirty every 2 minutes.
  - **markDirtyFetchesNew:** Sets this value to `false`. This is what causes the "No Refresh".
  - **removeTime:** Removes a row from memory if it is still dirty 2 minutes after being marked dirty.
- **Tree (No Remove):** This demo does not remove rows from memory once they've been loaded, but it does mark them dirty so they can be refreshed. You might use this feature if your application does not display a lot of data and can support the extra memory preasure. It can also make your application feel faster so you might strategically apply it to select entities in your appliction.
  - **markDirtyTime:** Marks a row dirty every 2 minutes.
  - **removeTime:** This is set to `0` so rows are never removed from memory.
- **Tree (No Dirty):** This demo sets the markDirtyTime to -1 so that nothing ever gets marked dirty. This means that data will never be refreshed and it will never be removed from memory. You would typically use this feture for lookup tables that don't change often so there is no reason to refresh them.
  - **markDirtyTime:** This is set to -1 so that nothing ever gets marked dirty or gets removed from memory.
