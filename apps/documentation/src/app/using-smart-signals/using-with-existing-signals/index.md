# Using With Existing Signals

Since the results of `createSmartSignal` and `getTopChildRows` return signals, they can be composed in other computed() signals to manage the data however you need. Just remember that for the magic to happen, you need to make sure to use the results of these two functions. Don't try to go after the core signals yourself. This is a limitation of how signals work.

You can also use with existing observables, including NgRX Selectors, once you've converted the observable to a Signal using the Angular `toSignal()` function.

> **NOTE**
> If you want to combine existing selectors and signals to migrate from classic NgRX to signals, you will need to convert your selector dependencies from the bottom up. This is a limitation of how Selectors and Signals work. Selectors are, essentially RxJS operators and operate on an existing stream. Think of them as enhanced combineLatest() operators.
>
> Signals are not streams and, even if you convert them to RxJS streams, and make them look like selectors, they do not work correctly when passed into createSelector(). Oh, they may for a while, but it won't take long before you figure out that they don't, and can't work that way.
>
> You may be better off converting all your existing code to use SmartNgRX and then convert SmartNgRX to SmartSignals since the two Smart APIs are very similar to each other.
