import { Component, effect, input, linkedSignal, untracked } from '@angular/core';
import { TextPredicate } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'bq-text-filter',
    templateUrl: './text-filter.component.html',
    imports: [MatFormField, MatSelect, MatOption, MatInput, MatCheckbox]
})
export class TextFilterComponent {
  readonly candidate = input.required<FilterCandidate>();

  readonly value = linkedSignal(() => this.predicate()?.text ?? '');

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

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown.set(showUnknown);
    this.updateCandidate();
  }

  private predicate(): TextPredicate | undefined {
    return this.candidate().predicate as TextPredicate | undefined;
  }

  private updateCandidate(): void {
    const value = this.value();
    const showUnknown = this.showUnknown();
    this.candidate().update({
      valid: showUnknown || !!value,
      predicate: {
        type: 'text',
        text: value,
        showUnknown,
      },
    });
  }
}
