import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Button } from '@blueriq/core';
import { BqIconDirective } from '@shared/directive/icon/icon.directive';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
@BlueriqComponent({
  type: Button,
})
export class ButtonComponent {

  constructor(@Host() public button: Button,
              public session: BlueriqSession,
              @Optional() @Host() public readonly list: List) {
  }

  isRaisedButton(): boolean {
    return !(this.list || this.button.styles.has(BqPresentationStyles.FLAT_BUTTON));
  }

  /**
   * A button is an icon button (round button with only icon) if it has no caption and a icon presentation style.
   * If the button has an icon presentation style but also a caption, a normal button is rendered since icon buttons
   * are too small to present captions.
   */
  isIconButton(): boolean {
    return !this.hasCaption() && this.hasIconStyle();
  }

  hasCaption(): boolean {
    return !!this.button.caption;
  }

  hasIconStyle(): boolean {
    return BqIconDirective.hasIcon(this.button.styles);
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
    return !this.button.styles.hasAny(
      BqPresentationStyles.PRIMARY, BqPresentationStyles.ACCENT,
      BqPresentationStyles.TERTIARY, BqPresentationStyles.FLAT_BUTTON);
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
