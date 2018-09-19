import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FilterOption, FilterValue } from '@blueriq/angular/lists';
import { momentToBackendFormat } from '@shared/date/bq-date-parser';
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
  remove = new EventEmitter<any>();

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
    if (this.filterValue.selectedOption!.type === 'date' || this.filterValue.selectedOption!.type === 'datetime') {
      if (moment.isMoment(value)) {
        value = momentToBackendFormat(value);
      }
    }
    this.filterValue.value = value;
    this.filterValue.showAll = false;
  }

  getOperations(): string[] {
    return this.filterValue.selectedOption ? this.filterValue.selectedOption.operations : [];
  }

  removeFilter(): void {
    this.remove.emit('remove me');
  }

}
