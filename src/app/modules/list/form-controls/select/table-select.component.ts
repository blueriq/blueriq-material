import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { getFieldMessages } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { SelectComponent } from '../../../form-controls/select/select.component';

@Component({
  selector: 'bq-table-select',
  templateUrl: './table-select.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: 'table [hasDomain]'
})
export class TableSelectComponent extends SelectComponent {

  getErrors(): string {
    return getFieldMessages(this.formControl).errors.map(error => error.text).toString();
  }

}
