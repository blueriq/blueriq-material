import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DateOperator, Filter2, FilteredColumn, FilterPredicate, NumericOperator } from '@blueriq/angular/lists';
import * as moment from 'moment';
import { FilterValue, Operation } from './types';

const MAX_FILTERS = 8;

@Component({
  selector: 'bq-table-filter',
  templateUrl: './table.filter.component.html',
  styleUrls: ['./table.filter.component.scss'],
  animations: [
    trigger('clearFilters', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('300ms ease-in', style({ width: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ width: '*', opacity: 1 }),
        animate('300ms ease-out', style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class TableFilterComponent implements OnInit {

  @Input()
  filter: Filter2;

  filterCandidates: FilterValue[] = [];
  showUnknownLabel: string;
  private filterDialog: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const filterValues = this.filter.currentFilters.all.map(filteredColumnToFilterValue);
    this.filterCandidates = filterValues.length > 0 ? filterValues : [new FilterValue()];

    this.showUnknownLabel = this.filter.currentColumns.map(c => c.showUnknownLabel)[0] || '';
  }

  canAddFilter(): boolean {
    return this.filterCandidates.length < MAX_FILTERS;
  }

  addFilter(): void {
    if (this.canAddFilter()) {
      this.filterCandidates.push(new FilterValue());
    }
  }

  doFilter(): void {
    const filteredColumns = this.filterCandidates
      .map(candidate => candidate.toFilteredColumn())
      .filter((filter): filter is FilteredColumn => !!filter);
    this.filter.apply(filteredColumns);

    this.filterDialog.close();
  }

  clearFilters(): void {
    this.filter.currentFilters.clear();
    this.filterCandidates = [new FilterValue()];
  }

  removeFilter(filterValue: FilterValue): void {
    this.filterCandidates.forEach((filter, index) => {
      if (filter === filterValue) {
        this.filterCandidates.splice(index, 1);
      }
    });
    if (this.filterCandidates.length === 0) {
      this.clearFilters();
    }
  }

  showFilter(dialog: TemplateRef<any>): void {
    this.filterDialog = this.dialog.open(dialog, {
      minWidth: '700px',
    });
  }

}

function filteredColumnToFilterValue({ column, predicate }: FilteredColumn): FilterValue {
  const operationValuePair = extractOperationValuePairFromPredicate(predicate);
  const filterValue = new FilterValue();
  filterValue.selectedOption = column;
  filterValue.showUnknown = predicate.showUnknown;
  filterValue.operation = operationValuePair.operation;
  filterValue.value = operationValuePair.value || '';
  filterValue.date = operationValuePair.date;
  return filterValue;
}

export interface OperationValuePair {
  operation: Operation;
  value?: string;
  date?: moment.Moment;
}

function extractOperationValuePairFromPredicate(predicate: FilterPredicate): OperationValuePair {
  switch (predicate.type) {
    case 'boolean':
      if (predicate.showTrue) {
        return { operation: Operation.TRUE, value: 'true' };
      } else if (predicate.showFalse) {
        return { operation: Operation.FALSE, value: 'false' };
      } else {
        return { operation: Operation.TRUE, value: 'false' };
      }
    case 'date':
      const date = predicate.date ? moment(predicate.date) : undefined;
      if (predicate.operator === DateOperator.On) {
        return { operation: Operation.ON, date };
      } else if (predicate.operator === DateOperator.After) {
        return { operation: Operation.FROM, date };
      } else if (predicate.operator === DateOperator.Before) {
        return { operation: Operation.TO, date };
      } else {
        return { operation: Operation.ON, date };
      }
    case 'domain':
      return { operation: Operation.HAS, value: predicate.values.join(',') };
    case 'numeric':
      if (predicate.operator === NumericOperator.Equals) {
        return { operation: Operation.EQ, value: predicate.value };
      } else if (predicate.operator === NumericOperator.LessThanEquals) {
        return { operation: Operation.LTE, value: predicate.value };
      } else if (predicate.operator === NumericOperator.GreaterThanEquals) {
        return { operation: Operation.GTE, value: predicate.value };
      } else {
        return { operation: Operation.EQ, value: '' };
      }
    case 'text':
      return { operation: Operation.EQ, value: predicate.text };
  }
}
