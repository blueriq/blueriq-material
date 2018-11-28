import { Component, Input } from '@angular/core';
import { TextPredicate } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';

@Component({
  selector: 'bq-text-filter',
  templateUrl: './text-filter.component.html',
})
export class TextFilterComponent {
  private _candidate: FilterCandidate;

  value: string;
  showUnknown: boolean;

  @Input()
  set candidate(candidate: FilterCandidate) {
    const predicate = candidate.predicate as TextPredicate | undefined;

    this.value = predicate ? predicate.text : '';
    this.showUnknown = predicate ? predicate.showUnknown : true;

    this._candidate = candidate;
    this.updateCandidate();
  }

  onValueChanged(value: string) {
    this.value = value;
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown = showUnknown;
    this.updateCandidate();
  }

  private updateCandidate(): void {
    const { value, showUnknown } = this;
    this._candidate.update({
      valid: showUnknown || !!value,
      predicate: {
        type: 'text',
        text: value,
        showUnknown,
      },
    });
  }
}
