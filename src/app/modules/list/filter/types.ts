import { ColumnFilter, DateOperator, FilteredColumn, FilterPredicate, NumericOperator } from '@blueriq/angular/lists';
import { Moment } from 'moment';

export enum Operation {
  EQ = 'Equal to',
  LTE = 'Less Than or Equal to',
  GTE = 'Greater Than or Equal to',
  IS = 'Is',
  ON = 'On',
  FROM = 'From',
  TO = 'To',
  TRUE = 'Show True',
  FALSE = 'Show False',
  HAS = 'Has',
}

/**
 * This class represents a filter to apply to a list.
 */
export class FilterValue {
  showUnknown = true;
  operation: Operation;
  value: string;
  date: Moment | undefined;
  selectedOption: ColumnFilter | undefined;

  /**
   * Returns whether this {@link FilterValue} instance is valid, meaning that the relevant properties are
   * defined/contain a value. A filter is valid if a column is set and an operation has been chosen and either
   * unknown is checked or a value must be chosen.
   *
   * @return boolean indicating whether this instance is valid or not
   */
  isValid(): boolean {
    if (!this.selectedOption || !this.operation) {
      return false;
    }

    return this.showUnknown || this.selectedOption.type === 'boolean' || !!this.value;
  }

  toFilteredColumn(): FilteredColumn | null {
    if (!this.selectedOption || !this.isValid()) {
      return null;
    }

    return {
      column: this.selectedOption,
      predicate: toPredicate(this.selectedOption, this),
    };
  }

  getOperations(): Operation[] {
    return this.selectedOption ? getOperationsForType(this.selectedOption) : [];
  }

}

function toPredicate(column: ColumnFilter, filterValue: FilterValue): FilterPredicate {
  switch (column.type) {
    case 'boolean':
      return {
        type: 'boolean',
        showUnknown: filterValue.showUnknown,
        showFalse: filterValue.operation === Operation.FALSE ? !!filterValue.value : false,
        showTrue: filterValue.operation === Operation.TRUE ? !!filterValue.value : false,
      };
    case 'date':
    case 'datetime':
      return {
        type: 'date',
        showUnknown: filterValue.showUnknown,
        operator: toDateOperator(filterValue.operation),
        date: filterValue.date ? filterValue.date.toDate() : null,
      };
    case 'domain':
      return {
        type: 'domain',
        showUnknown: filterValue.showUnknown,
        values: filterValue.value.split(','),
      };
    case 'integer':
    case 'number':
    case 'currency':
    case 'percentage':
      return {
        type: 'numeric',
        showUnknown: filterValue.showUnknown,
        operator: toNumericOperator(filterValue.operation),
        value: filterValue.value,
      };
    case 'text':
    default:
      return {
        type: 'text',
        showUnknown: filterValue.showUnknown,
        text: filterValue.value,
      };
  }
}

function toDateOperator(operation: Operation): DateOperator {
  switch (operation) {
    case Operation.TO:
      return DateOperator.Before;
    case Operation.ON:
      return DateOperator.On;
    case Operation.FROM:
      return DateOperator.After;
    default:
      return DateOperator.On;
  }
}

function toNumericOperator(operation: Operation): NumericOperator {
  switch (operation) {
    case Operation.EQ:
      return NumericOperator.Equals;
    case Operation.LTE:
      return NumericOperator.LessThanEquals;
    case Operation.GTE:
      return NumericOperator.GreaterThanEquals;
    default:
      return NumericOperator.Equals;
  }
}

export function getOperationsForType(column: ColumnFilter): Operation[] {
  switch (column.type) {
    case 'boolean':
      return [Operation.FALSE, Operation.TRUE];
    case 'date':
    case 'datetime':
      return [Operation.ON, Operation.FROM, Operation.TO];
    case 'domain':
      return [Operation.HAS];
    case 'integer':
    case 'number':
    case 'currency':
    case 'percentage':
      return [Operation.EQ, Operation.LTE, Operation.GTE];
    case 'text':
    default:
      return [Operation.IS];
  }
}
