import { Component, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

@Component({
    selector: 'bq-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['../selection-control.component.scss'],
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: `.${ BqPresentationStyles.DEPRECATED_RADIO }[multiValued=false][hasDomain], ` +
    `.${ BqPresentationStyles.ALLOPTIONSVISIBLE }[multiValued=false][hasDomain]`,
})
export class RadioButtonComponent implements OnInit, OnUpdate {

  direction: 'vertical' | 'horizontal';

  formControl = this.form.control(this.field, { syncOn: 'update', disableWhen: BqPresentationStyles.DISABLED });

  constructor(public field: Field,
              private readonly form: BlueriqFormBuilder,
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
   * By default, the list of radio buttons will be rendered vertically,
   * {@link BqPresentationStyles.HORIZONTAL} will render a horizontal list
   */
  private updateDirection() {
    if (this.field.styles.hasAny(BqPresentationStyles.HORIZONTAL, BqPresentationStyles.DEPRECATED_HORIZONTAL)) {
      this.direction = 'horizontal';
    } else {
      this.direction = 'vertical';
    }
  }

}
