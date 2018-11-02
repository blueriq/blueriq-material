### Table form-controls
This module takes care of the following components:

* date
* datetime
* input fields
  * currency
  * integer
  * number
  * percentage
  * string
* readonly
* select

The list.component.ts file has these elements scoped: 
``BlueriqComponents.scoped(TABLE_FORM_CONTROL_COMPONENTS)``
If no element could be picker from this list it will a component registered in the app.module.ts
