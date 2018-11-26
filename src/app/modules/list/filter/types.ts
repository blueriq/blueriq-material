import { ColumnFilter, FilteredColumn, FilterPredicate } from '@blueriq/angular/lists';

export class FilterCandidate {
  selectedColumn?: ColumnFilter;
  predicate?: FilterPredicate;
  valid?: boolean;

  constructor(filteredColumn?: FilteredColumn) {
    if (filteredColumn) {
      this.selectedColumn = filteredColumn.column;
      this.predicate = filteredColumn.predicate;
      this.valid = true;
    }
  }

  update(value: { predicate: FilterPredicate, valid: boolean }): void {
    this.predicate = value.predicate;
    this.valid = value.valid;
  }

  toFilteredColumn(): FilteredColumn | undefined {
    const { selectedColumn, predicate, valid } = this;
    if (selectedColumn && predicate && valid) {
      return { column: selectedColumn, predicate };
    }
  }
}
