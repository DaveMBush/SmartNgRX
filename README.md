# SmartNgRX

## Introduction

This project merges two concepts I've been playing with for a while.

At one of my previous jobs, I needed to work with data that could be essentially an infinite number of rows. This made retrieving the entire data set practically impossible and required that we not only use virtual scrolling to render the data but also use a concept of virtual data where we only retrieved the data that was needed to render the current view.

Fast forward to a similar situation and a lot more experience. One of the issues with the previous implementation was that I had to retrieve the data every time it scrolled into view. As you can imagine, even with the fastest retrieval times, this didn't paint nearly as fast as anyone would have liked. This time, we had more control over the data. It was still a large data set. But it was not infinite.

As we were in a meeting one day with everyone discussing various ways would could make the application perform better, I said, "Let me tell you what I've been thinking about." I proceeded to lay out a concept based on my earlier work where we'd only load the rows as we needed them AND remove them once we had some assurance they were no longer being used.

I was then told to go work on a POC for that concept and got far enough to know I was on to something but not far enough to solve all the issues we were going to run into.

Meanwhile, new management came in that talked the original manager out of working on this at this time and I was told to work on other things. I'm not complaining. While I wish I could have continued working on this, this was the right decision for the company.

Now, I couldn't let it go. I kept thinking about it. And another thought came to mind. If we always use essentially the same Actions, Effects and Reducers for each entity, could we just create factory methods that would generate them for us? And if we could do that, could we hide the bulk of what is NgRX from the developer?

At this point, I merged the two concepts. Using the main library of this project, you can register your NgRX entities in a providers section and then use "SmartSelectors" to join the data back together again. Only the join doesn't just join the data, it retrieves the data as it is accessed.

We are still at the very beginning of this project. We still need to provide a way of removing rows that are no longer being accessed. We still need to provide a way to perform CRUD operations on the rows. But the groundwork has been laid. At this point, the two things you need to know about NgRX are 1) You'll need to use selectors or the Smart Selectors from this library to "Join" or "Nest" rows and 2) you'll need to create Effect Services to deal with retrieving the data from the server (and ultimately perform the CRUD operations).

Have a look at our "Ultimate Goals" to see where we are headed.

## Ultimate Goals

- [x] Hide the NgRX boiler-plate code from the developer
- [x] Dynamically generate Actions, Reducers and Effects.
- [ ] Support server-side searching for rows
- [ ] Provide optimistic UI natively
- [x] Optionally remove unused entity rows from the store.
- [x] Optionally allow data to refresh using polling.
- [ ] Allow this to work with other NgRX implementations or use only this implementation as desired or needed.
- [ ] Provide multiple ways to retrieve child rows.
  - [x] For small sets of nested data, provide the IDs of the child elements in an array of the parent.
  - [ ] For larger sets of nested data, provide another mechanism that will allow for "paging" the rows.
- [x] Allow this to work with code that has to account for write lag on the server
- [ ] Allow the server to notify this code via websockets (or any future server side notification) that a row needs to be updated and have the code automatically refresh if the row is currently rendered some place.
- [ ] Provide hooks that allow the client to tell the server what rows/entities it is interested in hearing about changes for.

## Documentation

All the documentation can be found at [SmartNgRX Documentation](https://davembush.github.io/SmartNgRX/)

## How to run the main projects

### Prerequisites

- [NodeJS](https://nodejs.org/en/) - ^18.10.0 || ^20.0.0
- [pnpm](https://pnpm.io/) - ^8

### Steps

- Checkout the project
- Run `pnpm i`
- start the server with `pnpm run start:server`
- start the client with `pnpm run start`
- open a browser to `http://localhost:4200`

## How to run the documentation project

- Checkout the project (if you haven't already)
- Run `pnpm i` (if you haven't already)
- start the documentation server with `pnpm run start:documentation`
- open a browser to `http://localhost:4201`

## Participating

### [Code of Conduct](https://github.com/DaveMBush/SmartNgRX/blob/main/CODE_OF_CONDUCT.md)

### [Contributing](https://github.com/DaveMBush/SmartNgRX/blob/main/CONTRIBUTING.md)
