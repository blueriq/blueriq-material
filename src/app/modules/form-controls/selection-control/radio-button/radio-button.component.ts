import { Component, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

@Component({
  selector: 'bq-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss', '../selection-control.component.scss'],
})
@BlueriqComponent({
  type: Field,
  selector: `.${BqPresentationStyles.RADIO}[hasDomain], ` +
    `.${BqPresentationStyles.DEPRECATED_HORIZONTAL}[hasDomain], ` +
    `.${BqPresentationStyles.DEPRECATED_VERTICAL}[hasDomain], ` +
    `.${BqPresentationStyles.HORIZONTAL}[hasDomain]`,
})
export class RadioButtonComponent implements OnInit, OnUpdate {

  direction: 'vertical' | 'horizontal';

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(public field: Field,
              private form: BlueriqFormBuilder,
              @Optional() public readonly list: List) {
  }

  ngOnInit() {
    this.updateDirection();
  }

  bqOnUpdate() {
    this.updateDirection();
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Sets the direction in which the radio buttons are presented.
   * Options are {@link BqPresentationStyles.VERTICAL}
   * and {@link BqPresentationStyles.HORIZONTAL}
   */
  private updateDirection() {
    if (this.field.styles.hasAny(BqPresentationStyles.HORIZONTAL, BqPresentationStyles.DEPRECATED_HORIZONTAL)
      || this.field.domain.size === 2) {
      this.direction = 'horizontal';
    } else {
      this.direction = 'vertical';
    }
  }

}
