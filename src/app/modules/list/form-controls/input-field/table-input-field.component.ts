import { getFieldMessages } from '@blueriq/angular/forms';
import { InputFieldComponent } from '../../../form-controls/input-field/input-field.component';

export class TableInputFieldComponent extends InputFieldComponent {

  getErrors(): string {
    return getFieldMessages(this.formControl).errors.map(error => error.text).toString();
  }

}

