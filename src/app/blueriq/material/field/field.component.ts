import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})

@BlueriqComponent({
  type: Field
})

export class FieldComponent {

  constructor(@Host() public field: Field) {
  }

}
