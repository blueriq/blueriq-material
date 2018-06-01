### Element
Element is a generic solution for other components to easily display the following:
- Errors
- Warnings
- Explaintext
Which also helps to always give the same look and feel for all components that have validation and explaintext

**Usage**
```
<app-element [field]="field">
  <!-- your element, like field.component -->
</app-element>
```
Example:
```
<app-element [field]="field">
    <mat-form-field>
      <input matInput placeholder={{field.questionText}}>
    </mat-form-field>
</app-element>
```

**[field] paramater**
For ElementComponent to work it needs a field @Input
like: ```<app-element [field]="field">```
