import { Component, Input } from '@angular/core';
import { BooleanPredicate } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';

@Component({
    selector: 'bq-boolean-filter',
    templateUrl: './boolean-filter.component.html',
    standalone: false
})
export class BooleanFilterComponent {
  private _candidate: FilterCandidate;

  operation: 'true' | 'false' | 'both' | 'none';
  showUnknown: boolean;

  @Input()
  set candidate(candidate: FilterCandidate) {
    const predicate = candidate.predicate as BooleanPredicate | undefined;

    this.operation = predicate ? determineOperation(predicate) : 'true';
    this.showUnknown = predicate ? predicate.showUnknown : true;

    this._candidate = candidate;
    this.updateCandidate();
  }

  onOperationChanged(operation: 'true' | 'false' | 'both' | 'none'): void {
    this.operation = operation;
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown = showUnknown;
    this.updateCandidate();
  }

  private updateCandidate(): void {
    const { operation, showUnknown } = this;
    this._candidate.update({
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
