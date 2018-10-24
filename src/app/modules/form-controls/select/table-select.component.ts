import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { SelectComponent } from './select.component';

@Component({
  selector: 'bq-table-select',
  templateUrl: './table-select.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: 'table [hasDomain]'
})
export class TableSelectComponent extends SelectComponent {
}
