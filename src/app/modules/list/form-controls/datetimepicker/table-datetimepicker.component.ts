import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { getFieldMessages } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { DateTimepickerComponent } from '../../../form-controls/date/datetimepicker/datetimepicker.component';
import { dateTimeFormatProvider } from '../../../form-controls/date/datetimepicker/datetimepicker.owl';

@Component({
  selector: 'bq-table-datetimepicker',
  templateUrl: './table-datetimepicker.component.html',
  styleUrls: ['../table-form-control.scss'],
  providers: [dateTimeFormatProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
@BlueriqComponent({
  type: Field,
  selector: 'table [dataType=date], table [dataType=datetime]'
})
export class TableDatetimepickerComponent extends DateTimepickerComponent {

  getErrors(): string {
    return getFieldMessages(this.formControl).all.map(error => error.text).join('\n');
  }

}
