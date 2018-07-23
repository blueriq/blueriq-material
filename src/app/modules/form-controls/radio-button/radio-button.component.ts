import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../PresentationStyles';

@Component({
  selector: 'bq-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.radio[hasDomain]'
})
export class RadioButtonComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: PresentationStyles.DISABLED });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /**
   * Determines the direction in which the radio buttons are presented. Options are {@link PresentationStyles.VERTICAL}
   * and {@link PresentationStyles.HORIZONTAL}
   * @returns {string} denoting the direction in which the buttons are presented
   */
  determineDirection(): string {
    if (this.field.styles.has(PresentationStyles.VERTICAL)) {
      return 'vertical';
    }
    if (this.field.styles.has(PresentationStyles.HORIZONTAL) || this.field.domain.options.length === 2) {
      return 'horizontal';
    }
    return 'vertical';
  }
}
