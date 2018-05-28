import {Component, Host} from '@angular/core';
import {BlueriqComponent, BlueriqSession} from '@blueriq/angular';
import {Button} from '@blueriq/core';


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

  onClick(): void {
    if(this.button.enabled) {
      this.session.pressed(this.button);
    }
  }

}
