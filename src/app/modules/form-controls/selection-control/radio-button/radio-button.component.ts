import { Component, Host, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

type RadioButtonDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'bq-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss', '../selection-control.component.scss'],
})
@BlueriqComponent({
  type: Field,
  selector: '.Radio[hasDomain], .' +
    BqPresentationStyles.DEPRECATED_HORIZONTAL + '[hasDomain] , .' +
    BqPresentationStyles.DEPRECATED_VERTICAL + '[hasDomain], .' +
    BqPresentationStyles.HORIZONTAL + '[hasDomain]',
})
export class RadioButtonComponent implements OnInit, OnUpdate {

  public direction: RadioButtonDirection = 'vertical';

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder,
              @Host() @Optional() public readonly list: List) {
  }

  ngOnInit() {
    this.determineDirection();
  }

  bqOnUpdate() {
    this.determineDirection();
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Determines the direction in which the radio buttons are presented.
   * Options are {@link BqPresentationStyles.VERTICAL}
   * and {@link BqPresentationStyles.HORIZONTAL}
   * @returns {string} denoting the direction in which the buttons are presented
   */
  private determineDirection() {
    if (this.field.styles.hasAny(BqPresentationStyles.HORIZONTAL, BqPresentationStyles.DEPRECATED_HORIZONTAL)
      || this.field.domain.options.length === 2) {
      this.direction = 'horizontal';
    }
  }

}
