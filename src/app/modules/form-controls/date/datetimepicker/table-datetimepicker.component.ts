import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { DateTimepickerComponent } from './datetimepicker.component';
import { dateTimeFormatProvider } from './datetimepicker.owl';

@Component({
  selector: 'bq-tabledatetimepicker',
  templateUrl: './table-datetimepicker.component.html',
  providers: [dateTimeFormatProvider]
})
@BlueriqComponent({
  type: Field,
  selector: 'table [dataType=date],[dataType=datetime]'

})
export class TableDatetimepickerComponent extends DateTimepickerComponent {

}
