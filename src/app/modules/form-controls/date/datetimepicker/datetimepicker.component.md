### Datetimepicker
For the datetimepicker we have chosen to use the @danielmoncada/angular-datetime-picker component: https://www.npmjs.com/package/@danielmoncada/angular-datetime-picker. This component looks like the standard material datepicker component, is regularly released and is compatible with Angular 6.
It supports different locales by utilizing the MomentJS library, just as the Material datepicker does. 
Because the material datepicker and the @danielmoncada/angular-datetime-picker are a bit different in how they look, we decided to use the latter component for both the date and the datetimepicker so it looks consistent throughout applications. 

#### Datatype
The datepicker is a field with the datatype `date`.

#### Disabled & read only
When the attribute has a presentation style `Disabled` the datepicker is greyed out.

When the attribute has a read only flag, only the value of the attribute is presented (as text). If the attribute does not have a value, nothing is shown.
