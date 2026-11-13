import { Component, Input } from '@angular/core';
import { Pagination } from '@blueriq/angular/lists';
import { MatIconButton } from '@angular/material/button';
import { BlueriqCommonModule } from '@blueriq/angular';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'bq-table-pagination',
    templateUrl: './table.pagination.component.html',
    styleUrls: ['./table.pagination.component.scss'],
    imports: [MatIconButton, BlueriqCommonModule, MatIcon]
})
export class TablePaginationComponent {

  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input()
  public readonly pagination: Pagination;

}
