import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '.' + PresentationStyles.TOGGLE + '[dataType=boolean]'
})

export class SlideToggleComponent {

  constructor(@Host() public field: Field) {
  }

  /** Whether the slide toggle has a presentation style {@link PresentationStyles.DISABLED} */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the slide toggle is read only */
  isReadonly() {
    return this.field.readonly;
  }

}
