### Element
Element is a generic solution for other components to easily display the following:
- Errors
- Warnings
- Explaintext
Which also helps to always give the same look and feel for all components that have validation and explaintext

**Usage**
```
<bq-element [field]="field">
  <!-- your element, like field.component -->
</bq-element>
```
Example:
```
<bq-element [field]="field">
    <mat-form-field>
      <input matInput placeholder={{field.questionText}}>
    </mat-form-field>
</bq-element>
```

**[field] paramater**
For FieldContainerComponent to work it needs a field @Input
like: ```<bq-element [field]="field">```
