import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BlueriqSession } from '@blueriq/angular';
import { DateOperator, DatePredicate } from '@blueriq/angular/lists';
import { computeFirstDayOfWeek } from '@shared/date/bq-date-parser';
import * as moment from 'moment';
import { dateTimeFormatProvider } from '../../../form-controls/date/datetimepicker/datetimepicker.owl';
import { FilterCandidate } from '../types';

const operations = {
  before: DateOperator.Before,
  on: DateOperator.On,
  after: DateOperator.After,
};

@Component({
  selector: 'bq-date-filter',
  templateUrl: './date-filter.component.html',
  providers: [dateTimeFormatProvider],
})
export class DateFilterComponent {
  readonly operations = operations;
  private _candidate: FilterCandidate;

  pickerType: 'calendar' | 'both';
  operator: DateOperator;
  dateControl = new FormControl();
  showUnknown: boolean;

  @Input()
  set type(type: 'date' | 'datetime') {
    this.pickerType = type === 'date' ? 'calendar' : 'both';
  }

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

  constructor(private readonly session: BlueriqSession) {
    this.firstDayOfWeek = computeFirstDayOfWeek(session.localization);
  }

  onDateChanged(event: { value: moment.Moment | undefined, source: any }) {
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
    const date = dateControl.value as moment.Moment | null;
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
