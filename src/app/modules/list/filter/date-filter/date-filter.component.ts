import { Component, inject, Input } from '@angular/core';
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
  private _candidate: FilterCandidate;

  pickerType: 'calendar' | 'both';
  operator: DateOperator;
  dateControl = new FormControl<moment.Moment | null>(null);
  showUnknown: boolean;

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  set type(type: 'date' | 'datetime') {
    this.pickerType = type === 'date' ? 'calendar' : 'both';
  }

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  set candidate(candidate: FilterCandidate) {
    const predicate = candidate.predicate as DatePredicate | undefined;

    this.operator = predicate ? predicate.operator : DateOperator.On;
    this.dateControl.setValue(predicate && predicate.date ? moment(predicate.date) : null);
    this.showUnknown = predicate ? predicate.showUnknown : true;

    this._candidate = candidate;
    this.updateCandidate();
  }

  firstDayOfWeek: number;

  constructor() {
    this.firstDayOfWeek = computeFirstDayOfWeek(this.session.localization);
  }

  onDateChanged(event: { value: moment.Moment | undefined; source: { value: unknown } }) {
    event.source.value = event.value; // triggers date formatting in input field
    this.updateCandidate();
  }

  onOperatorChanged(operator: DateOperator) {
    this.operator = operator;
    this.updateCandidate();
  }

  onUnknownChanged(showUnknown: boolean) {
    this.showUnknown = showUnknown;
    this.updateCandidate();
  }

  private updateCandidate(): void {
    const { operator, dateControl, showUnknown } = this;
    const date = dateControl.value;
    this._candidate.update({
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
