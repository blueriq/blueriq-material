import { Component, effect, input, linkedSignal, untracked } from '@angular/core';
import { BooleanPredicate } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'bq-boolean-filter',
    templateUrl: './boolean-filter.component.html',
    imports: [MatFormField, MatSelect, MatOption, MatCheckbox]
})
export class BooleanFilterComponent {
  readonly candidate = input.required<FilterCandidate>();

  readonly operation = linkedSignal<'true' | 'false' | 'both' | 'none'>(() => {
    const predicate = this.predicate();
    return predicate ? determineOperation(predicate) : 'true';
  });

  readonly showUnknown = linkedSignal(() => this.predicate()?.showUnknown ?? true);

  constructor() {
    effect(() => {
      this.candidate();
      untracked(() => this.updateCandidate());
    });
  }

  onOperationChanged(operation: 'true' | 'false' | 'both' | 'none'): void {
    this.operation.set(operation);
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown.set(showUnknown);
    this.updateCandidate();
  }

  private predicate(): BooleanPredicate | undefined {
    return this.candidate().predicate as BooleanPredicate | undefined;
  }

  private updateCandidate(): void {
    const operation = this.operation();
    const showUnknown = this.showUnknown();
    this.candidate().update({
      valid: showUnknown || operation !== 'none',
      predicate: {
        type: 'boolean',
        showTrue: operation === 'true' || operation === 'both',
        showFalse: operation === 'false' || operation === 'both',
        showUnknown,
      },
    });
  }
}

function determineOperation(predicate: BooleanPredicate): 'true' | 'false' | 'both' | 'none' {
  if (predicate.showTrue && predicate.showFalse) {
    return 'both';
  } else if (predicate.showTrue) {
    return 'true';
  } else if (predicate.showFalse) {
    return 'false';
  } else {
    return 'none';
  }
}
