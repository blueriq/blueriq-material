import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';

@Component({
  selector: 'bq-percentage-field',
  templateUrl: '../input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=percentage]:not([hasDomain])',
})
export class PercentageFieldComponent extends InputFieldComponent {

  fieldSuffix = '\u0025';

}
