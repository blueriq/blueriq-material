import { Component, Input } from '@angular/core';
import { Filter, FilterOption, OPERATION_TYPES } from '@blueriq/angular/lists';
import { BqFilter } from './table.filter.component';

@Component({
  selector: 'bq-table-filter-value',
  templateUrl: './table.filter-value.component.html'
})
export class TableFilterValueComponent {

  operations: OPERATION_TYPES[] = [];

  @Input()
  private readonly filter: Filter;

  @Input()
  private filterValue: BqFilter;

  onColumn(filterOption: FilterOption): void {
    this.operations = this.filter.getOperationsForType(filterOption.type);
    this.filterValue.filterOption = filterOption;
  }

  onOperation(operation: OPERATION_TYPES): void {
    this.filterValue.operation = operation;
  }

  getOperationAsString(operation: OPERATION_TYPES): string {
    return OPERATION_TYPES[operation];
  }

  onValue(value: string): void {
    this.filterValue.value = value;
    this.filterValue.showUnknown = true;
    this.filterValue.showAll = false;
  }
}
