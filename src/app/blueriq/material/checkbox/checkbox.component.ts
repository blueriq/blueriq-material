import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=boolean]'
})
export class CheckboxComponent {

  constructor(@Host() public field: Field) {
  }

}
