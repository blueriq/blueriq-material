import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { InputFieldComponent } from '../input-field.component';
import { MatFormField, MatPrefix, MatLabel, MatSuffix, MatHint, MatError } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bq-string-field',
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
  selector: '[dataType=text]:not([hasDomain])',
})
export class StringFieldComponent extends InputFieldComponent {

  constructor() {
    const field = inject(Field);
    const form = inject(BlueriqFormBuilder);

    super(field, form);
    if (this.field.styles.hasAny(BqPresentationStyles.PASSWORD, BqPresentationStyles.DEPRECATED_PASSWORD)) {
      this.inputType = 'password';
    }
  }

}
