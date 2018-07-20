### Error Component

The error component is used to present system errors (or messages) to the user. This will be Blueriq
errors, like 'session expired', 'flow has ended', etc.

**Usage**

```
<bq-error [error]="yourErrorModel" (close)="yourCloseHandler()"></bq-error>
```

The [error] directive expects an object of type ErrorModel and the (close) event handler can be used 
to add behavior in case a non fatal error is closed. The Blueriq Material Theme will just remove the
error from view when it is closed.
