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

  @Input()
  public readonly pagination: Pagination;

}
