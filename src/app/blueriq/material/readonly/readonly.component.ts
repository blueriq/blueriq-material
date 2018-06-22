import { Component, Host } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'bq-readonly',
  templateUrl: './readonly.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: bySelector(`[readonly]
    :not(.Disabled)
    :not([dataType=boolean])
    :not([dataType=currency])
    :not([dataType=percentage])`)
})
export class ReadonlyComponent {
  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public readonly field: Field, private form: BlueriqFormBuilder) {
  }
}
