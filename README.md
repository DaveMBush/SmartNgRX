# DynamicNgrxTest

## Introduction

This is a project that demonstrates creating NgRX Actions, Reducers and Effects dynamically.

I'm just starting out and plan to embellish this into a very opinionated framework that will eliminate most of the boiler-plate code that is required to create NgRX Actions, Reducers and Effects and will do most of the dispatching for you. Leaving you to set up the selectors to join your data together and leaving all the state management details to the framework.

## Untimate Goals:

- [ ] Hide all the NgRX boiler-plate code from the developer
- [x] Dynamically generate Actions, Reducers and Effects.
- [ ] Provide optimistic UI natively
- [ ] Optionally remove unused entity rows from the store.
- [ ] Allow this to work with other NgRX implementations or use only this implementation as desired or needed.
- [ ] Allow this to work with code that has to account for write lag on the server
- [ ] Allow the server to notify this code via websockets (or any future server side notification) that a row needs to be updated and have the code automatically refresh if the row is currently rendered some place.
- [ ] Provide hooks that allow the client to tell the server what rows/entities it is interested in hearing about changes for.

## Documentation

The documentation for the APIs can be found at [Dynamic NgRX Documentation](https://davembush.github.io/dynamic-ngrx-test/)
