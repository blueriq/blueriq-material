### Error Component

The error component is used to present system errors (or messages) to the user. This will be Blueriq
errors, like 'session expired', 'flow has ended', etc.

**Usage**

```
<bq-error [error]="yourErrorModel"></bq-error>
```

The `[error]` input expects an object of type `ErrorModel`. This model may have its `dismiss` property set
to allow the user to dismiss the error.
