import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { TableInputFieldComponent } from '../table-input-field.component';

@Component({
    selector: 'bq-table-integer-field',
    templateUrl: '../table-input-field.component.html',
    styleUrls: ['../../table-form-control.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=integer]:not([hasDomain])',
})
export class TableIntegerFieldComponent extends TableInputFieldComponent {
}
