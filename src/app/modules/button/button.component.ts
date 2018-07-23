import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button } from '@blueriq/core';
import { PresentationStylesNew } from '../PresentationStylesNew';

@Component({
  selector: 'bq-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
@BlueriqComponent({
  type: Button
})
export class ButtonComponent {

  constructor(@Host() public button: Button, private session: BlueriqSession) {
  }

  getColor(): string | null {
    if (this.button.styles.has(PresentationStylesNew.PRIMARY)) {
      return 'primary';
    } else if (this.button.styles.has(PresentationStylesNew.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }

  isDisabled(): boolean {
    return this.button.disabled || this.button.styles.has(PresentationStylesNew.DISABLED);
  }

  onClick(): void {
    if (this.button.enabled) {
      this.session.pressed(this.button);
    }
  }

}
