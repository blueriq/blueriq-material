import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button } from '@blueriq/core';

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

@BlueriqComponent({
  type: Button
})

export class ButtonComponent {

  constructor(@Host() public button: Button, private session: BlueriqSession) {
  }

  getColor(): string {
    if (this.button.styles.has('Primary') || this.button.styles.has('button_primary')) {
      return 'primary';
    } else if (this.button.styles.has('Accent')) {
      return 'accent';
    } else {
      return null;
    }
  }

  isDisabled(): boolean {
    return this.button.disabled || this.button.styles.has('Disabled');
  }

  onClick(): void {
    if (this.button.enabled) {
      this.session.pressed(this.button);
    }
  }

}
