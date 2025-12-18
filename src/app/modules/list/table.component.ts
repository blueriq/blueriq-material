import { Component, Input } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { TABLE_FORM_CONTROL_COMPONENTS } from './form-controls/table-form-control.module';

@Component({
    selector: 'bq-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [BlueriqComponents.scoped(TABLE_FORM_CONTROL_COMPONENTS)],
    standalone: false
})
export class TableComponent {

  @Input()
  public readonly table: Table;
}
