import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { FilterOption, FilterValue } from '@blueriq/angular/lists';
import { computeFirstDayOfWeek } from '@shared/date/bq-date-parser';
import * as moment from 'moment';
import { dateTimeFormatProvider } from '../../form-controls/date/datetimepicker/datetimepicker.owl';

@Component({
  selector: 'bq-table-filter-value',
  templateUrl: './table.filter-value.component.html',
  styleUrls: ['./table.filter-value.component.scss'],
  providers: [dateTimeFormatProvider]
})
export class TableFilterValueComponent {

  @HostBinding('class') classes = 'bq-table-filter-value';

  @Input()
  filterValue: FilterValue;

  @Input()
  filterOptions: FilterOption[];

  @Output()
  remove = new EventEmitter<void>();

  firstDayOfWeek: number;

  constructor(private readonly session: BlueriqSession) {
    this.firstDayOfWeek = computeFirstDayOfWeek(session.localization);
  }

  onColumn(selectedOption: FilterOption): void {
    this.filterValue.selectedOption = selectedOption;
    // reset filter values because they depend on selected option
    if (selectedOption.operations.length > 0) {
      // select the first operation for convenience
      this.filterValue.operation = selectedOption.operations[0];
    }
    this.filterValue.value = '';
    this.filterValue.showAll = false;
  }

  onOperation(operation: string): void {
    this.filterValue.operation = operation;
  }

  onValue(value: string): void {
    if (moment.isMoment(value)) {
      switch (this.filterValue.selectedOption!.type) {
        case 'date':
          value = this.session.localization.dateFormats.date.format(value.toDate());
          break;
        case 'datetime':
          value = this.session.localization.dateFormats.dateTime.format(value.toDate());
          break;
      }
    }

    this.filterValue.value = value;
    this.filterValue.showAll = false;
  }

  getOperations(): string[] {
    return this.filterValue.selectedOption ? this.filterValue.selectedOption.operations : [];
  }

  removeFilter(): void {
    this.remove.emit();
  }

}
