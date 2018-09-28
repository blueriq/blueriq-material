# Theming

The Blueriq theme is based on the branding guidelines of Blueriq and is created using @angular/material2 theming options. See https://material.angular.io/guide/theming.

The provided theme located `src/theme/{theme-name}}/` is used in two ways:

1. `index.scss` is used to generate a global CSS and is included into the package by Angular CLI (see `angular.json`)
2. Variables and other global mixins are exposed to all components via the `stylePreprocessorOptions.includePaths` option in `angular.json`. 

The last option makes it possible to change the includePaths property to a new theme and all existing components use the new global variables and mixins:

```
@import 'globals/variables';

 button: {
     color: mat-color($bq-primary-palette);
 }
```

# Palettes
There are additional palletes defined to the default Material palletes (Primary, Accent and Error). Some components utilize a tertary color for UX reasons. Below example demonstrates how to provide the palettes. 
```
$bq-primary-palette: mat-palette($bq-mat-primary-blue);
$bq-accent-palette: mat-palette($bq-mat-primary-purple);
$bq-error-palette: mat-palette($bq-mat-accent-red);
$bq-theme: mat-light-theme($bq-primary-palette, $bq-accent-palette, $bq-error-palette);

//Specific none material colour palettes
$bq-tertiary-palette: mat-palette($bq-mat-accent-green);
$bq-warn-palette: mat-palette($bq-mat-accent-orange);
$bq-info-palette: mat-palette($bq-mat-primary-blue);
$bq-success-palette: mat-palette($bq-mat-accent-green);
``` 

## Custom Theme
There are multiple ways to create your own custom theme, you could fork this project and edit the default Blueriq theme located in `src/theme/blueriq/*`. This probably results in future merge conflict issues. It is probably better to create a new theme following these steps:

1. Create a new directory in `src/theme/`
2. Create an `index.scss` file in the theme-root
3. Import components from Blueriq in your `index.scss` if no override is necessary, example: `@import '../blueriq/components/datetimepicker';`
4. Change references inside `angular.json` from `src/theme/blueriq` to your theme-name
5. Select or create Material palettes acording to your branding guidelines. See http://mcg.mbitson.com/ for an easy Material palette creator and implement it in your theme
6. Implement your branding guidelines in the newly created theme directory
7. Edit `page.component.html` to create a custom header and footer

Note: If your IDE has issues with the import statement `@import 'globals/variables'`, mark your theme directory as resource root.
