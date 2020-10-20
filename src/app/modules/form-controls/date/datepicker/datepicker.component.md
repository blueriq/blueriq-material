### Datepicker Material
For an overview of the datepicker component you can find the information here: https://material.angular.io/components/datepicker/overview

#### Datatype
The datepicker is a field with the datatype `date`.

#### Disabled & read only
When the attribute has a presentation style `Disabled` the datepicker is greyed out.

When the attribute has a read only flag, only the value of the attribute is presented (as text). If the attribute does not have a value, nothing is shown.

#### Using datepicker
If you want to use the datepicker of `material` you can put the presentation style `material` on the field. Why we chose this, you can read it in the next paragraph.

### Ng pick datetime
For the datetime we have chosen to use the @danielmoncada/angular-datetime-picker component. This component looks like the standard material datepicker component, is regularly released and is compatible with Angular 10. 
Because the datepicker and the @danielmoncada/angular-datetime-picker are a little bit different in how they look, we decided to use the latter component for both the date and the datetimepicker so it looks consistent throughout applications. 
