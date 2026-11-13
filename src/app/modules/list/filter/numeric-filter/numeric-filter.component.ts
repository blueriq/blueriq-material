import { Component, effect, input, linkedSignal, untracked } from '@angular/core';
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

  readonly candidate = input.required<FilterCandidate>();

  readonly value = linkedSignal(() => this.predicate()?.value ?? '');

  readonly operator = linkedSignal(() => this.predicate()?.operator ?? NumericOperator.Equals);

  readonly showUnknown = linkedSignal(() => this.predicate()?.showUnknown ?? true);

  constructor() {
    effect(() => {
      this.candidate();
      untracked(() => this.updateCandidate());
    });
  }

  onValueChanged(value: string) {
    this.value.set(value);
    this.updateCandidate();
  }

  onOperatorChanged(operator: NumericOperator) {
    this.operator.set(operator);
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown.set(showUnknown);
    this.updateCandidate();
  }

  private predicate(): NumericPredicate | undefined {
    return this.candidate().predicate as NumericPredicate | undefined;
  }

  private updateCandidate(): void {
    const operator = this.operator();
    const value = this.value();
    const showUnknown = this.showUnknown();
    this.candidate().update({
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
