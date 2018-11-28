import { Component, Input } from '@angular/core';
import { DomainPredicate } from '@blueriq/angular/lists';
import { Domain } from '@blueriq/core';
import { FilterCandidate } from '../types';

@Component({
  selector: 'bq-domain-filter',
  templateUrl: './domain-filter.component.html',
})
export class DomainFilterComponent {
  private _candidate: FilterCandidate;

  values: string[];
  showUnknown: boolean;

  @Input()
  domain: Domain;

  @Input()
  set candidate(candidate: FilterCandidate) {
    const predicate = candidate.predicate as DomainPredicate | undefined;

    this.values = predicate ? predicate.values : [];
    this.showUnknown = predicate ? predicate.showUnknown : true;

    this._candidate = candidate;
    this.updateCandidate();
  }

  onValueChanged(values: string[]) {
    this.values = values;
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown = showUnknown;
    this.updateCandidate();
  }

  private updateCandidate(): void {
    const { values, showUnknown } = this;
    this._candidate.update({
      valid: showUnknown || values.length > 0,
      predicate: {
        type: 'domain',
        values,
        showUnknown,
      },
    });
  }
}
