# Global Registration

Now that we have all the pieces in place, we can register our definitions with Smart Signals so that they can be used by the library.

Before we do this, though, we need to register global, top level definitions using `provideSmartNgRX`.

We recommend adding this to your app.module.ts file directly, or indirectly.

If you are using a stand alone component for your `app.component.ts` file, then you'll want to include this in your `app.config.ts` file that `main.ts` references.

If you've jumped ahead and looked at the definition of `provideSmartNgRX`, you'll see that it takes an optional `MarkAndDeleteInit` object as a parameter. This allows us to configure how Mark and Delete works globally. We'll cover this in more detail in the [Mark and Delete](/using-smart-signals/mark-and-delete) section.
