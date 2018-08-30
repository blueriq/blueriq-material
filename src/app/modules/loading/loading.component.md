### Loading spinner
The loading spinner is implemented at two places in the code. In the index.html and a loading component.

#### Index
In `src/index.html`, a `div` with a class `splashscreen` is put inside of the `bq-app-root` element. This
element is replaced once Angular has been initialized, so this element achieves that a loader is shown even
before the Angular application has completed loading. Since this is not rendered as Angular component, the
stylesheet is bundled with the theme in `splashscreen.scss`, that specifies an image to be shown as background
image.

#### Loading component
The loading component will show a spinner (the *e* of the Blueriq logo) for certain kinds of loading activity
of the application. By default, button presses and field refreshes will show the spinner with a small delay,
which is 400 ms by default.
