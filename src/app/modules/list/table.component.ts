import { Component, input } from '@angular/core';
import { BlueriqComponents, BlueriqCommonModule } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { TABLE_FORM_CONTROL_COMPONENTS } from './form-controls/table-form-control.components';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { TableHeaderColumnComponent } from './header/header.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'bq-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [BlueriqComponents.scoped(TABLE_FORM_CONTROL_COMPONENTS)],
    imports: [
      MatTable,
      BqKeyDirective,
      BlueriqCommonModule,
      MatColumnDef,
      MatHeaderCellDef,
      MatHeaderCell,
      TableHeaderColumnComponent,
      MatCellDef,
      MatCell,
      MatHeaderRowDef,
      MatHeaderRow,
      MatRowDef,
      MatRow,
      AsyncPipe,
    ]
})
export class TableComponent {

  public readonly table = input<Table>(undefined!);
}
