import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';

@Component({
  selector: 'bq-integer-field',
  templateUrl: '../input-field.component.html',
  styleUrls: ['../input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=integer]:not([hasDomain])',
})
export class IntegerFieldComponent extends InputFieldComponent {
}
