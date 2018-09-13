### Container
This component renders a Blueriq container.

### Content styles
If you add the content style `dashboard_row` to the container, all children will be displayed horizontally.  
If you add the content style `dashboard_widget`, the container will be displayed as a card.

### Presentation styles
Add the presentation style `Introduction` to a container,to have the container be displayed as transparent and have a
 image shown in the top left corner.  
Add the presentation style `Transparent` to a container,to have the container be displayed as transparent.  
Add no presentation style, the container will display as a card by default.  

Add the presentation style `Horizontal` to a container, all attributes in this container will be displayed horizontal.  
Add the presentation style `AlignRight` to a container, all attributes in this container will be displayed at the 
right.  

### `Horizontal` rendering
Within a `Horizontal` container, children can have presentation styles like `Weight<number>`, e.g. `Weight3`.  
If you have a child with `Weight3` and another child with `Weight1`, the total weight number would be 4. The first 
child will take 3/4th of the available horizontal space and the second child would take 1/4th.

Note: when dashboarding, the legacy content styles of form `dashboard_column<number>` will also be 
interpreted as weights.
