import { Component } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Button } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { ButtonComponent } from '../button.component';
import { MatIconButton } from '@angular/material/button';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';
import { MatIcon } from '@angular/material/icon';
import { BqIconDirective } from '../../../shared/directive/icon/icon.directive';

@Component({
  selector: 'bq-button-icon',
  templateUrl: './button.icon.component.html',
  imports: [MatIconButton, BlueriqCommonModule, BqKeyDirective, MatIcon, BqIconDirective]
})
@BlueriqComponent({
  type: Button,
  selector: `.${BqPresentationStyles.ONLYICON}, .${BqPresentationStyles.DEPRECATED_ONLYICON}`,
})
export class ButtonIconComponent extends ButtonComponent {
}
