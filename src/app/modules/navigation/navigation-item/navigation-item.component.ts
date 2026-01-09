import { Component, inject } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { Button } from '@blueriq/core';

type State = 'complete' | 'incomplete' | undefined;

@Component({
    selector: 'bq-navigation-item',
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss'],
    standalone: false
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
