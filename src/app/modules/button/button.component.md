### Button

For an overview of the button component, you can find the information here: https://material.angular.io/components/button/overview

### Use Presentation styles Button Blueriq

Add the presentation style `Disabled` on an attribute, the component is grayed out.  
Add the presentation style `Primary` on an attribute, the button will have a background in the primary color.
Add the presentation style `Secondary` on an attribute, the button will have a background in the secondary color.  
Add the presentation style `Tertiary` on an attribute, the button will have a background in the accent color.  
Add no presentation style, the button will have a white background.

Add the presentation style `FlatButton` to the button to display the button more subtly. This presentation style can
be used in conjunction with the styles mentioned above.

### Prevent actions when the runtime is busy

When the runtime is already handling a blocking request for your session (a session start or an
interaction such as another button press), the button is disabled so the user can't trigger a second
request. It re-enables once that request has finished. Field refreshes are not treated as blocking,
so they don't disable buttons — otherwise the field-blur that a button click causes would disable
the button mid-click and the press would be lost.
