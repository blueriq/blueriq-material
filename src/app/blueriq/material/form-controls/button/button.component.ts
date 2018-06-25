import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
@BlueriqComponent({
  type: Button
})
export class ButtonComponent {

  constructor(@Host() public button: Button, public session: BlueriqSession) {
  }

  getColor(): string | null {
    if (this.button.styles.has(PresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (this.button.styles.has(PresentationStyles.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }

  isDisabled(): boolean {
    return this.button.disabled || this.button.styles.has(PresentationStyles.DISABLED);
  }

  onClick(): void {
    if (this.button.enabled) {
      this.session.pressed(this.button);
    }
  }

}
