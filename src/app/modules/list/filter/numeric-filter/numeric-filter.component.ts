import { Component, Input } from '@angular/core';
import { NumericOperator, NumericPredicate } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

const operations = {
  equals: NumericOperator.Equals,
  gte: NumericOperator.GreaterThanEquals,
  lte: NumericOperator.LessThanEquals,
};

@Component({
    selector: 'bq-numeric-filter',
    templateUrl: './numeric-filter.component.html',
    imports: [MatFormField, MatSelect, MatOption, MatInput, MatCheckbox]
})
export class NumericFilterComponent {
  readonly operations = operations;
  private _candidate: FilterCandidate;

  value: string;
  operator: NumericOperator;
  showUnknown: boolean;

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  set candidate(candidate: FilterCandidate) {
    const predicate = candidate.predicate as NumericPredicate | undefined;

    this.value = predicate ? predicate.value : '';
    this.operator = predicate ? predicate.operator : NumericOperator.Equals;
    this.showUnknown = predicate ? predicate.showUnknown : true;

    this._candidate = candidate;
    this.updateCandidate();
  }

  onValueChanged(value: string) {
    this.value = value;
    this.updateCandidate();
  }

  onOperatorChanged(operator: NumericOperator) {
    this.operator = operator;
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown = showUnknown;
    this.updateCandidate();
  }

  private updateCandidate(): void {
    const { operator, value, showUnknown } = this;
    this._candidate.update({
      valid: showUnknown || !!value,
      predicate: {
        type: 'numeric',
        operator,
        value,
        showUnknown,
      },
    });
  }
}
