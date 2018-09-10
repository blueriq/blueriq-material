import { Component, Input } from '@angular/core';
import { FilterOption, FilterValue } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table-filter-value',
  templateUrl: './table.filter-value.component.html',
  styleUrls: ['./table.filter-value.component.scss']
})
export class TableFilterValueComponent {

  @Input()
  filterValue: FilterValue;

  @Input()
  filterOptions: FilterOption[];

  onColumn(selectedOption: FilterOption): void {
    this.filterValue.selectedOption = selectedOption;
  }

  onOperation(operation: string): void {
    this.filterValue.operation = operation;
  }

  onValue(value: string): void {
    this.filterValue.value = value;
    this.filterValue.showAll = false;
  }

  getOperations(): string[] {
    if (this.filterValue.selectedOption) {
      return this.filterValue.selectedOption.operations;
    }
    return [];
  }
}
