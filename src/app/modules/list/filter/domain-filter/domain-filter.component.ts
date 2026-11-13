import { Component, Input } from '@angular/core';
import { DomainPredicate } from '@blueriq/angular/lists';
import { Domain, TechnicalValue } from '@blueriq/core';
import { FilterCandidate } from '../types';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'bq-domain-filter',
    templateUrl: './domain-filter.component.html',
    imports: [MatFormField, MatSelect, MatOption, MatCheckbox]
})
export class DomainFilterComponent {
  private _candidate: FilterCandidate;

  values: TechnicalValue[];
  showUnknown: boolean;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  domain: Domain;

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
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
