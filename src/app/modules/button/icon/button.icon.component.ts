import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Button } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'bq-button-icon',
  templateUrl: './button.icon.component.html',
  standalone: false
})
@BlueriqComponent({
  type: Button,
  selector: `.${BqPresentationStyles.ONLYICON}, .${BqPresentationStyles.DEPRECATED_ONLYICON}`,
})
export class ButtonIconComponent extends ButtonComponent {

  constructor() {
    const button = inject(Button);
    const list = inject(List, { optional: true });

    super(button, list);
  }
}
