# Global Registration

Now that we have all the pieces in place, we can register our definitions with Smart NgRX so that they can be used by the library.

Before we do this, though, we need to register global, top level definitions using `provideSmartNgRX`.

We recommend adding this to your app.module.ts file directly, or indirectly.

If you are using a stand alone component for your `app.component.ts` file, then you'll want to include this in your `app.config.ts` file that `main.ts` references.

If you've jumped ahead and looked at the definition of `provideSmartNgRX`, you'll see that it takes an optional `MarkAndDeleteInit` object as a parameter. This allows us to configure how Mark and Delete works globally. We'll cover this in more detail in the [Mark and Delete](/using-smart-ng-rx/mark-and-delete) section.

While you are here, you'll also want to make sure you've provided the NgRX store. You'll want to do this using `StoreModule.forRoot({})`. If you are using the latest Angular syntax, you'll need to put this in the `providers` section of your app.module.ts file or something it imports directly.

If your code is using stand-alone components that uses the new NgRX syntax of `provideStore()`, you'll want to put that in the providers section as well. NgRX relies on the older syntax so it can work with existing code.

You do not need to provide the effects unless your code relies on them. NgRX does not use effects to achieve its goals.
