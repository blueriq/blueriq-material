import { Component, effect, input, linkedSignal, untracked } from '@angular/core';
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
  readonly domain = input.required<Domain>();

  readonly candidate = input.required<FilterCandidate>();

  readonly values = linkedSignal<TechnicalValue[]>(() => this.predicate()?.values ?? []);

  readonly showUnknown = linkedSignal(() => this.predicate()?.showUnknown ?? true);

  constructor() {
    effect(() => {
      this.candidate();
      untracked(() => this.updateCandidate());
    });
  }

  onValueChanged(values: string[]) {
    this.values.set(values);
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown.set(showUnknown);
    this.updateCandidate();
  }

  private predicate(): DomainPredicate | undefined {
    return this.candidate().predicate as DomainPredicate | undefined;
  }

  private updateCandidate(): void {
    const values = this.values();
    const showUnknown = this.showUnknown();
    this.candidate().update({
      valid: showUnknown || values.length > 0,
      predicate: {
        type: 'domain',
        values,
        showUnknown,
      },
    });
  }
}
