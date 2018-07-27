import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStylesNew } from '../../PresentationStylesNew';

export type RadioButtonDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'bq-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.Radio[hasDomain], .' + PresentationStylesNew.DEPRECATED_HORIZONTAL + '[hasDomain] , .' +
  PresentationStylesNew.DEPRECATED_VERTICAL + '[hasDomain], .' + PresentationStylesNew.HORIZONTAL + '[hasDomain]'
})
export class RadioButtonComponent implements OnInit, OnUpdate {

  public direction: RadioButtonDirection = 'vertical';

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: PresentationStylesNew.DISABLED });

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
   * Options are {@link PresentationStylesNew.VERTICAL}
   * and {@link PresentationStylesNew.HORIZONTAL}
   * @returns {string} denoting the direction in which the buttons are presented
   */
  private determineDirection() {
    if (this.field.styles.has(PresentationStylesNew.HORIZONTAL)
      || this.field.styles.has(PresentationStylesNew.DEPRECATED_HORIZONTAL)
      || this.field.domain.options.length === 2) {
      this.direction = 'horizontal';
    }
  }

}
