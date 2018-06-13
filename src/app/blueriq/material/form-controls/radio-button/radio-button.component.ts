import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.radio[hasDomain]'
})
export class RadioButtonComponent implements OnInit {

  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /**
   * Returns if this radio form field is disabled. This is the case when the field has a style
   * {@link PresentationStyles.DISABLED}
   */
  isDisabled(): boolean {
    return this.field.styles.has(PresentationStyles.DISABLED);
  }

  /** Returns if this radio form field is readonly. */
  isReadonly(): boolean {
    return this.field.readonly;
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

  ngOnInit(): void {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
  }
}
