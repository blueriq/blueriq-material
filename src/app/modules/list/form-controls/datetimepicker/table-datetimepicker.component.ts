import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { getFieldMessages } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { DateTimepickerComponent } from '../../../form-controls/date/datetimepicker/datetimepicker.component';
import { dateTimeFormatProvider } from '../../../form-controls/date/datetimepicker/datetimepicker.owl';
import { MatFormField } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@Component({
    selector: 'bq-table-datetimepicker',
    templateUrl: './table-datetimepicker.component.html',
    styleUrls: ['../table-form-control.scss'],
    providers: [dateTimeFormatProvider],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatFormField, BqKeyDirective, MatTooltip, MatInput, FormsModule, OwlDateTimeModule, ReactiveFormsModule]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=date], [dataType=datetime]',
})
export class TableDatetimepickerComponent extends DateTimepickerComponent {

  getErrors(): string {
    return getFieldMessages(this.formControl).all.map(error => error.text).join('\n');
  }

}
