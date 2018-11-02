import { InputFieldComponent } from '../../../form-controls/input-field/input-field.component';
import { TableInputFieldComponent } from './table-input-field.component';

describe('TableInputFieldComponent', () => {

  it('should extend from InputFieldComponent', () => {
    expect((TableInputFieldComponent.prototype instanceof InputFieldComponent)).toBeTruthy();
  });

});
