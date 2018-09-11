### Page Component

This component renders a Blueriq Page. It always renders a header and it triggers rendering of its children.

### Styles
There are 5 content styles that influence the page's behavior:
* `small` - The content is displayed in a narrow column (maximum width is 512 pixels)
* `medium` - The content is displayed in a medium sized column (maximum width is 768 pixels)
* `large` - The content is displayed in a large sized column (maximum width is 1024 pixels)
* `full` - The content takes up the full width of the window
* `responsive` - *(default)* The content width depends on the screen width:
  * It is narrow (512 pixels) on screens smaller than 768 pixels.
  * It is medium (768 pixels) on screens smaller than 1024 pixels.
  * It is large (1024 pixels) on screens smaller than 1240 pixels.
  * It is extra large (1240 pixels) on screens wider than 1240 pixels.
  
The widths mentioned can easily be changed to suit your needs in the `theme/globals/_responsive-layout.scss` file.
