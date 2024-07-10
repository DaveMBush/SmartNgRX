# SmartNgRX

## What is SmartNgRX?

SmartNgRX is a library that hides most of NgRX from the developer for CRUD operations while still using NgRX under the hood and allowing you to use it with existing NgRX code. It not only supports CRUD but also implements optimistic UI for updates and deletes. Below is a list of features we have implemented so far (checked) along with some of our dreams (unchecked):

- [x] Eliminate NgRX boiler-plate code.
- [x] Dynamically generate Actions, Reducers and Effects.
- [x] Complete CRUD support.
- [x] Provide optimistic UI natively
- [x] Optionally remove unused entity rows from the store if they are no longer being used.
- [x] Optionally allow data to refresh if it is currently being displayed.
- [x] Allow this to work with other NgRX implementations or use only this implementation as desired or needed.
- [ ] Provide multiple ways to retrieve child rows.
  - [x] For small sets of nested data, provide the IDs of the child elements in an array of the parent.
  - [ ] For larger sets of nested data, provide another mechanism that will allow for "paging" the rows.
- [x] Allow this to work with code that has to account for write lag on the server (you can control this by using the Effects Service you have complete control over).
- [x] Allow the server to notify this code via websockets (or any future server-side notification) that a row needs to be updated and have the code automatically refresh if the row is currently rendered someplace.
- [ ] Provide hooks that allow the client to tell the server what rows/entities it is interested in hearing about changes for.
- [ ] Use Signals, as an alternative, under the hood instead of Observables to allow for better performance and less memory usage.

More details are in our [documentation](https://davembush.github.io/SmartNgRX/).

## Installation

To install this library, run:

```bash
$ npm install @smarttools/smart-ngrx
```

## History

This project merges two concepts I've been playing with for a while.

At one of my previous jobs, I needed to work with data that could be essentially an infinite number of rows. This made retrieving the entire data set practically impossible and required that we not only use virtual scrolling to render the data but also use a concept of virtual data where we only retrieved the data that was needed to render the current view.

Fast forward to a similar situation and a lot more experience. One of the issues with the previous implementation was that I had to retrieve the data every time it scrolled into view. As you can imagine, even with the fastest retrieval times, this didn't paint nearly as fast as anyone would have liked. This time, we had more control over the data. It was still a large data set. But it was not infinite.

As we were in a meeting one day with everyone discussing various ways would could make the application perform better, I said, "Let me tell you what I've been thinking about." I proceeded to lay out a concept based on my earlier work where we'd only load the rows as we needed them AND remove them once we had some assurance they were no longer being used.

I was then told to go work on a POC for that concept and got far enough to know I was on to something but not far enough to solve all the issues we were going to run into.

Meanwhile, new management came in that talked the original manager out of working on this at this time and I was told to work on other things. I'm not complaining. While I wish I could have continued working on this, this was the right decision for the company.

Now, I couldn't let it go. I kept thinking about it. And another thought came to mind. If we always use essentially the same Actions, Effects and Reducers for each entity, could we just create factory methods that would generate them for us? And if we could do that, could we hide the bulk of what is NgRX from the developer?

At this point, I merged the two concepts. Using the main library of this project, you can register your NgRX entities in a providers section and then use "SmartSelectors" to join the data back together again. Only the join doesn't just join the data, it retrieves the data as it is accessed.

Have a look at our "Ultimate Goals" to see where we are headed and how much we've completed so far.

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

> [!NOTE]
> If you get an error about file watcher running out of file handles, you may need to increase the number of file handles available to the system. In Ubuntu and similar linux systems, including WSL, you can do this by running:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## How to run the documentation project

- Checkout the project (if you haven't already)
- Run `pnpm i` (if you haven't already)
- start the documentation server with `pnpm run start:documentation`
- open a browser to `http://localhost:4201`

## Participating

### [Code of Conduct](https://github.com/DaveMBush/SmartNgRX/blob/main/CODE_OF_CONDUCT.md)

### [Contributing](https://github.com/DaveMBush/SmartNgRX/blob/main/CONTRIBUTING.md)
