import { Component } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { ReadonlyComponent } from '../../../readonly/readonly.component';

@Component({
  selector: 'bq-table-readonly',
  templateUrl: './table-readonly.component.html',
  styleUrls: ['../table-form-control.scss'],
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]:not([dataType=boolean])', { priorityOffset: 100 }),
})
export class TableReadonlyComponent extends ReadonlyComponent {
}
