import { Component, computed, effect, inject, input, linkedSignal, untracked } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlueriqSession } from '@blueriq/angular';
import { DateOperator, DatePredicate } from '@blueriq/angular/lists';
import { computeFirstDayOfWeek } from '@shared/date/bq-date-parser';
import moment from 'moment/min/moment-with-locales';
import { dateTimeFormatProvider } from '../../../form-controls/date/datetimepicker/datetimepicker.owl';
import { FilterCandidate } from '../types';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';

const operations = {
  before: DateOperator.Before,
  on: DateOperator.On,
  after: DateOperator.After,
};

@Component({
  selector: 'bq-date-filter',
  templateUrl: './date-filter.component.html',
  providers: [dateTimeFormatProvider],
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    FormsModule,
    OwlDateTimeModule,
    ReactiveFormsModule,
    MatPrefix,
    MatIcon,
    MatCheckbox,
  ]
})
export class DateFilterComponent {
  private readonly session = inject(BlueriqSession);

  readonly operations = operations;

  readonly type = input.required<'date' | 'datetime'>();

  readonly candidate = input.required<FilterCandidate>();

  readonly pickerType = computed(() => this.type() === 'date' ? 'calendar' : 'both');

  readonly operator = linkedSignal(() => this.predicate()?.operator ?? DateOperator.On);

  readonly showUnknown = linkedSignal(() => this.predicate()?.showUnknown ?? true);

  dateControl = new FormControl<moment.Moment | null>(null);

  firstDayOfWeek: number;

  constructor() {
    this.firstDayOfWeek = computeFirstDayOfWeek(this.session.localization);
    effect(() => {
      this.candidate();
      untracked(() => {
        this.dateControl.setValue(this.predicateDate());
        this.updateCandidate();
      });
    });
  }

  onDateChanged(event: { value: moment.Moment | undefined; source: { value: unknown } }) {
    event.source.value = event.value; // triggers date formatting in input field
    this.updateCandidate();
  }

  onOperatorChanged(operator: DateOperator) {
    this.operator.set(operator);
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown.set(showUnknown);
    this.updateCandidate();
  }

  private predicate(): DatePredicate | undefined {
    return this.candidate().predicate as DatePredicate | undefined;
  }

  private predicateDate(): moment.Moment | null {
    const date = this.predicate()?.date;
    return date ? moment(date) : null;
  }

  private updateCandidate(): void {
    const operator = this.operator();
    const showUnknown = this.showUnknown();
    const date = this.dateControl.value;
    this.candidate().update({
      valid: showUnknown || !!date,
      predicate: {
        type: 'date',
        operator,
        date: date ? date.toDate() : null,
        showUnknown,
      },
    });
  }
}
