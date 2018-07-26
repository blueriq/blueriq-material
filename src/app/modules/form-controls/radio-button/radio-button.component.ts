import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStylesNew } from '../../PresentationStylesNew';

@Component({
  selector: 'bq-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.Radio[hasDomain]'
})
export class RadioButtonComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: PresentationStylesNew.DISABLED });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /**
   * Determines the direction in which the radio buttons are presented.
   * Options are {@link PresentationStylesNew.VERTICAL}
   * and {@link PresentationStylesNew.HORIZONTAL}
   * @returns {string} denoting the direction in which the buttons are presented
   */
  determineDirection(): string {
    if (this.field.styles.has(PresentationStylesNew.OPTIONSVERTICAL)) {
      return 'vertical';
    }
    if (this.field.styles.has(PresentationStylesNew.OPTIONSHORIZONTAL)
      || this.field.styles.has(PresentationStylesNew.RADIOHORIZONTAL)
      || this.field.domain.options.length === 2) {
      return 'horizontal';
    }
    return 'vertical';
  }
}
