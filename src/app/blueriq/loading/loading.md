### Loading spinner
The loading spinner is implemented at two places in the code. In the index.html and a loading component.

#### Index
In the index.html is added a `div` inside the bq-app-root with a class `splashscreen`. To realize the 
spinner (Blueriq logo) when Angular is loading, the file splashscreen.scss is added to the theme folder. 
And the image will be loaded as a background image. 

#### Loading component
The loading component will show a spinner (the `e` of the Blueriq logo). The loading component will be use the
LoadingService of red-cow. With the state (starting, loading, idle) you can distract when the spinner must be 
shown. 

#### Time loading spinner
The spinner will be shown if the loading is 400 ms. You can change this in the loading.component.ts file
inside the ngOnInit().

