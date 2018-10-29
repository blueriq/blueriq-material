### Page messages
In Blueriq a page can contain messages. These messages are errors and/or warnings that are thrown by services or when
a flow failed to execute properly for instance. The messages effect is used to display these page messages.
 
### SnackBar
To show the page messages the MatSnackBar is used. For an overview of the matSnackBar component see 
https://material.angular.io/components/snack-bar/overview

### Messages effect
The messages effect responds to three types of actions:
1. Session loaded action
2. Changed page action
3. Page updated action

Whenever one of these actions occurs, the effect inspects if there are page messages available to display.
If that is the case, the messages are shown in a snackbar.

Currently the snackbar cannot be dismissed, because the messages usually signal a problem with an external
system or configuration issue that needs to be resolved before normal operation can be continued.
 
Because of this, whenever a snackbar needs to be displayed, it is first checked that the message is not already
displayed, to prevent animations of the snackbar without presenting new information.
