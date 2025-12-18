import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { InputFieldComponent } from '../input-field.component';

@Component({
    selector: 'bq-string-field',
    templateUrl: '../input-field.component.html',
    styleUrls: ['../input-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=text]:not([hasDomain])',
})
export class StringFieldComponent extends InputFieldComponent {

  constructor(field: Field, form: BlueriqFormBuilder) {
    super(field, form);
    if (this.field.styles.hasAny(BqPresentationStyles.PASSWORD, BqPresentationStyles.DEPRECATED_PASSWORD)) {
      this.inputType = 'password';
    }
  }

}
