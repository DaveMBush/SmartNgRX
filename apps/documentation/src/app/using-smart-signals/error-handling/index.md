# Error Handling

From time to time, SmartNgRX will catch errors and fail gracefully. But, you will probably still want to know they occurred.

For this, we've created a service token that you can use to register your own class which we will use to notify your code of the error.

The token you'll need to import is `smartErrorHandlerToken` and you'll want your class to implement `SmartErrorHandler` which has one method `handleError`.

`handleError` takes two arguments:

- `message`: A string that describes where the error originated
- `error`: The error that occurred as caught by the exception handler
