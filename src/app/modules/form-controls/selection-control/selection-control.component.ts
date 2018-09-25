import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getBlueriqField, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';

@Component({
  selector: 'bq-selection-control',
  templateUrl: './selection-control.component.html',
  styleUrls: ['./selection-control.component.scss']
})
export class SelectionControlComponent {

  @Input() control: FormControl;

  @Input() inTable: boolean;

  get field(): Field {
    return getBlueriqField(this.control);
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.control);
  }

}
