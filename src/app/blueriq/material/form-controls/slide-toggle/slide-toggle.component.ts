import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

@Component({
  selector: 'bq-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.' + PresentationStyles.TOGGLE + '[dataType=boolean]'
})
export class SlideToggleComponent implements OnInit {

  formControl = this.form.control(this.field, { syncOn: 'update' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /** Whether the slide toggle has a presentation style {@link PresentationStyles.DISABLED} */
  isDisabled() {
    return this.field.styles.has(PresentationStyles.DISABLED);
  }

  /** Whether the slide toggle is read only */
  isReadonly() {
    return this.field.readonly;
  }

  ngOnInit(): void {
    if (this.isDisabled() || this.isReadonly()) {
      this.formControl.disable();
    }
    this.formControl.setValue(this.field.getValue());
  }

}
