import { Component } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { Button } from '@blueriq/core';

type State = 'complete' | 'incomplete' | undefined;

@Component({
  selector: 'bq-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
@BlueriqComponent({
  type: Button,
})
export class NavigationItemComponent implements OnUpdate {

  state: State = undefined;

  constructor(public button: Button) {
    this.update();
  }

  bqOnUpdate(): void {
    this.update();
  }

  update(): void {
    this.state = this.button.properties['status'];
  }
}
