### Notification Overlay Component

This component is used to present notifications, such as errors or messages, to the user.

**Usage**

```
<bq-notification-overlay [notification]="yourNotification"></bq-error>
```

The `[notification]` input expects an object of type `NotificationModel`. This model may have its `dismiss` property set
to allow the user to dismiss the error.
