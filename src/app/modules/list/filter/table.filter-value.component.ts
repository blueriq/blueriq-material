import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { ColumnFilter } from '@blueriq/angular/lists';
import { computeFirstDayOfWeek } from '@shared/date/bq-date-parser';
import { Moment } from 'moment';
import { dateTimeFormatProvider } from '../../form-controls/date/datetimepicker/datetimepicker.owl';
import { FilterValue, Operation } from './types';

@Component({
  selector: 'bq-table-filter-value',
  templateUrl: './table.filter-value.component.html',
  styleUrls: ['./table.filter-value.component.scss'],
  providers: [dateTimeFormatProvider],
})
export class TableFilterValueComponent {

  @HostBinding('class') classes = 'bq-table-filter-value';

  @Input()
  filterValue: FilterValue;

  @Input()
  currentColumns: ColumnFilter[];

  @Output()
  remove = new EventEmitter<void>();

  firstDayOfWeek: number;

  constructor(private readonly session: BlueriqSession) {
    this.firstDayOfWeek = computeFirstDayOfWeek(session.localization);
  }

  onColumn(selectedOption: ColumnFilter): void {
    this.filterValue.selectedOption = selectedOption;

    // reset filter values because they depend on selected option
    this.filterValue.operation = this.getOperations()[0] || Operation.IS; // select the first operation for convenience
    this.onValue('');
  }

  onOperation(operation: Operation): void {
    this.filterValue.operation = operation;
  }

  onValue(value: string): void {
    this.filterValue.value = value;
    this.filterValue.date = undefined;
  }

  onDateValue(event: { source: any, value: Moment | undefined }): void {
    if (event.value) {
      event.source.value = event.value;
    }
    this.filterValue.value = '';
    this.filterValue.date = event.value;
  }

  getOperations(): Operation[] {
    return this.filterValue.getOperations();
  }

  removeFilter(): void {
    this.remove.emit();
  }

}
