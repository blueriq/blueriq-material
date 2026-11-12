import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';
import { MatFormField, MatPrefix, MatLabel, MatSuffix, MatHint, MatError } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bq-currency-field',
    templateUrl: '../input-field.component.html',
    styleUrls: ['../input-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatFormField,
      BqKeyDirective,
      MatPrefix,
      MatIcon,
      MatLabel,
      MatInput,
      FormsModule,
      ReactiveFormsModule,
      MatSuffix,
      MatHint,
      MatError,
    ]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=currency]:not([hasDomain])',
})
export class CurrencyFieldComponent extends InputFieldComponent {

  iconPrefix = 'euro_symbol';
}
