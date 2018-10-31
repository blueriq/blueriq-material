import { Component, Input } from '@angular/core';
import { Limit } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table-limit',
  templateUrl: './table.limit.component.html'
})
export class TableLimitComponent {

  @Input()
  public readonly limit: Limit;

}
