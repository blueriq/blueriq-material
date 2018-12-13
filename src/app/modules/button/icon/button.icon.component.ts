import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Button } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'bq-button-icon',
  templateUrl: './button.icon.component.html',
})
@BlueriqComponent({
  type: Button,
  selector: `.${BqPresentationStyles.ONLYICON}, .${BqPresentationStyles.DEPRECATED_ONLYICON}`,
})
export class ButtonIconComponent extends ButtonComponent {

  constructor(@Host() public button: Button,
              @Optional() @Host() public readonly list: List) {
    super(button, list);
  }
}
