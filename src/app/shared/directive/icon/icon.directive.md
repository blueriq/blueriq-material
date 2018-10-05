## Blueriq icon directive
The `bqIcon` directive is an easy way to display a **font-awesome** icon.
Give the directive all the presentation styles and the directive itself will find the icon it should display.
If the list of presentation styles does not contain any icon, no icon will be displayed.


## Studio vs fontawesome
Some icons contain characters that are not allowed in studio to use (like '-'), these characters should be replaced with lowerdash _
For example:

- Fontawesome icon: `exclamation-sign` in studio becomes: `icon_exclamation_sign` 

notice the prefix `icon_`, this is needed for all **font-awesome** icons

## Usage
For example:  
- `<mat-icon [bqIcon]="button.styles"></mat-icon>`  
- `<mat-icon [bqIcon]="container.styles"></mat-icon>`


## Deprecations
The following icon presentation styles become deprecated and should use the direct **font-awesome** name instead
<pre>
- icon_exclamation_sign  -> icon_exclamation_circle
- icon_info_sign         -> icon_info_circle
- icon_remove            -> icon_times
- icon_remove_circle     -> icon_times_circle
- icon_time              -> icon_clock_o
- icon_warning_sign      -> icon_exclamation_triangle
- icon_signout           -> icon_sign_out
- icon_file              -> icon_file_o
- icon_file_pdf          -> icon_file_pdf_o
- icon_file_image        -> icon_file_image_o
</pre>
