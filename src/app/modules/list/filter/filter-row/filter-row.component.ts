import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnFilter } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';

@Component({
    selector: 'bq-filter-row',
    templateUrl: './filter-row.component.html',
    styleUrls: ['./filter-row.component.scss'],
    standalone: false
})
export class FilterRowComponent {

  @Input()
  currentColumns: ColumnFilter[];

  @Input()
  candidate: FilterCandidate;

  @Output()
  removed = new EventEmitter<void>();

  getType(): 'empty' | 'domain' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'text' {
    if (!this.candidate.selectedColumn) {
      return 'empty';
    }

    const type = this.candidate.selectedColumn.type;
    switch (type) {
      case 'domain':
      case 'boolean':
      case 'date':
      case 'datetime':
        return type;
      case 'currency':
      case 'percentage':
      case 'number':
      case 'integer':
        return 'numeric';
      default:
        return 'text';
    }
  }

  onColumnChanged(column: ColumnFilter): void {
    this.candidate.selectedColumn = column;
    this.candidate.predicate = undefined;
  }
}
