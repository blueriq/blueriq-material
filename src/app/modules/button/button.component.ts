import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
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

  constructor(@Host() public button: Button,
              private session: BlueriqSession,
              @Optional() @Host() public readonly table: Table) {
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

  hasTertiary(): boolean {
    return this.button.styles.has(PresentationStylesNew.TERTIARY);
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
