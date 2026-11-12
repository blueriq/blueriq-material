import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { TableInputFieldComponent } from '../table-input-field.component';
import { MatFormField, MatPrefix, MatLabel, MatSuffix } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../../../shared/directive/bq-key/bq-key.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bq-table-integer-field',
    templateUrl: '../table-input-field.component.html',
    styleUrls: ['../../table-form-control.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatFormField,
      BqKeyDirective,
      BlueriqCommonModule,
      MatTooltip,
      MatPrefix,
      MatLabel,
      MatIcon,
      MatInput,
      FormsModule,
      ReactiveFormsModule,
      MatSuffix,
    ]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=number]:not([hasDomain])',
})
export class TableNumberFieldComponent extends TableInputFieldComponent {
}
