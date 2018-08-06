import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

type RadioButtonDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'bq-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.Radio[hasDomain], .' +
  BqPresentationStyles.DEPRECATED_HORIZONTAL + '[hasDomain] , .' +
  BqPresentationStyles.DEPRECATED_VERTICAL + '[hasDomain], .' +
  BqPresentationStyles.HORIZONTAL + '[hasDomain]'
})
export class RadioButtonComponent implements OnInit, OnUpdate {

  public direction: RadioButtonDirection = 'vertical';

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  ngOnInit() {
    this.determineDirection();
  }

  bqOnUpdate() {
    this.determineDirection();
  }

  /**
   * Determines the direction in which the radio buttons are presented.
   * Options are {@link BqPresentationStyles.VERTICAL}
   * and {@link BqPresentationStyles.HORIZONTAL}
   * @returns {string} denoting the direction in which the buttons are presented
   */
  private determineDirection() {
    if (this.field.styles.has(BqPresentationStyles.HORIZONTAL)
      || this.field.styles.has(BqPresentationStyles.DEPRECATED_HORIZONTAL)
      || this.field.domain.options.length === 2) {
      this.direction = 'horizontal';
    }
  }

}
