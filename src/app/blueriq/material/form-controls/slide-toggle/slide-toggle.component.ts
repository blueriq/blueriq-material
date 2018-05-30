import { Component, Host } from '@angular/core';
import {Field} from '@blueriq/core';
import {BlueriqComponent} from '@blueriq/angular';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})

@BlueriqComponent({
  type: Field,
  /** With .toggle we look if there is a match with the presentation style toggle*/
  selector: '.toggle[dataType=boolean]'
})

export class SlideToggleComponent {

  constructor(@Host() public field: Field) {
  }

  /** Whether the slide toggle has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the slide toggle is read only */
  isReadonly() {
    return this.field.readonly;
  }

}
