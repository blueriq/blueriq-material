import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Table } from '@blueriq/angular/lists';
import { Field } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

@Component({
  selector: 'bq-checkbox',
  templateUrl: './checkbox.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=boolean]'
})
export class CheckboxComponent {

  formControl = this.form.control(this.field, {
    syncOn: 'update',
    ifUnknown: false,
    disableWhen: BqPresentationStyles.DISABLED
  });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder,
              @Host() @Optional() public readonly table: Table) {
  }
}
