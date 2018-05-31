import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.radio[hasDomain]'
})
export class RadioComponent {

  constructor(@Host() public field: Field) {
  }

  /** Returns if this radio form field is disabled. This is the case when the field has a style 'Disabled'. */
  isDisabled(): boolean {
    return this.field.styles.has('Disabled');
  }

  /** Returns if this radio form field is readonly. */
  isReadonly(): boolean {
    return this.field.readonly;
  }

  /**
   * Determines the direction in which the radio buttons are presented. Options are `vertical` and `horizontal`
   * @returns {string} denoting the direction in which the buttons are presented
   */
  determineDirection(): string {
    if (this.field.styles.has('vertical')) {
      return 'vertical';
    }
    if (this.field.styles.has('horizontal') || this.field.domain.options.length === 2) {
      return 'horizontal';
    }
    return 'vertical';
  }
}
