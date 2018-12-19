import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { TableInputFieldComponent } from '../table-input-field.component';

@Component({
  selector: 'bq-table-currency-field',
  templateUrl: '../table-input-field.component.html',
  styleUrls: ['../../table-form-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=currency]:not([hasDomain])',
})
export class TableCurrencyFieldComponent extends TableInputFieldComponent {

  iconPrefix = 'euro_symbol';
}
