# Page messages
In Blueriq, a page can contain messages. These messages are errors and/or warnings that are thrown by services or when
a flow failed to execute properly for instance. The messages effect is used to display these page messages.

### SnackBar
To show the page messages, the MatSnackBar is used. For an overview of the MatSnackBar component see 
https://material.angular.io/components/snack-bar/overview

### Messages effect
The messages effect responds to the below set of actions:
1. Session loaded action
2. Changed page action
3. Page updated action

Whenever one of these actions occurs, the effect inspects if there are page messages available to display.
If that is the case, the messages are shown in a snackbar.

### Limitation
The error doesn't return when dismissed, until you trigger another page error.

### Security messages

When a user's input is regarded insecure by the Blueriq Runtime, the Security Violation action is published
containing a general message that you may want to show to the user. By default, a snackbar is shown similar
to page messages.

### Security messages

When a user's input is regarded insecure by the Blueriq Runtime, the Security Violation action is published
containing a general message that you may want to show to the user. By default, a snackbar is shown similar
to page messages.
