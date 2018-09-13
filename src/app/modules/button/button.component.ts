import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Button } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
@BlueriqComponent({
  type: Button
})
export class ButtonComponent {

  constructor(@Host() public button: Button,
              public session: BlueriqSession,
              @Optional() @Host() public readonly table: Table) {
  }

  shouldRaiseButton(): boolean {
    return !(this.table || this.button.styles.has(BqPresentationStyles.FLAT_BUTTON));
  }

  getColor(): string | null {
    if (this.button.styles.has(BqPresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (this.button.styles.has(BqPresentationStyles.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }

  /**
   * Determines if there is a styling specification set for the current button.
   */
  hasDefaultStyling(): boolean {
    return !this.button.styles.hasAny(BqPresentationStyles.PRIMARY, BqPresentationStyles.ACCENT, BqPresentationStyles.TERTIARY, BqPresentationStyles.FLAT_BUTTON);
  }

  isDisabled(): boolean {
    return this.button.disabled || this.button.styles.has(BqPresentationStyles.DISABLED);
  }

  onClick(): void {
    if (this.button.enabled) {
      this.session.pressed(this.button);
    }
  }
}
