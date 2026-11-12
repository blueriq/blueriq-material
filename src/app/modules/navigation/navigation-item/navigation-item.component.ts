import { Component, inject } from '@angular/core';
import { BlueriqComponent, OnUpdate, BlueriqCommonModule } from '@blueriq/angular';
import { Button } from '@blueriq/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

type State = 'complete' | 'incomplete' | undefined;

@Component({
    selector: 'bq-navigation-item',
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss'],
    imports: [MatIcon, MatButton, BlueriqCommonModule]
})
@BlueriqComponent({
  type: Button,
})
export class NavigationItemComponent implements OnUpdate {
  button = inject(Button);


  state: State = undefined;

  constructor() {
    this.update();
  }

  bqOnUpdate(): void {
    this.update();
  }

  update(): void {
    this.state = this.button.properties['status'];
  }
}
