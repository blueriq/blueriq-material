import { Directive } from '@angular/core';
import { getFieldMessages } from '@blueriq/angular/forms';
import { InputFieldComponent } from '../../../form-controls/input-field/input-field.component';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class TableInputFieldComponent extends InputFieldComponent {

  getErrors(): string {
    return getFieldMessages(this.formControl).all.map(error => error.text).join('\n');
  }

  protected determinePlaceholder() {
    this.placeholder = (this.field.placeholder || '') + (this.field.required ? ' *' : '');
  }
}

