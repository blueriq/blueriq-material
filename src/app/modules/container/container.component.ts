import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { PresentationStylesNew } from '../PresentationStylesNew';

@Component({
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
  animations: [
    trigger('animate', [
      transition(':leave', [
        query('@*', animateChild(), { optional: true })
      ])
    ])
  ]
})
@BlueriqComponent({
  type: Container
})
export class ContainerComponent {

  constructor(@Host() public container: Container) {
  }

  isHorizontal() {
    return this.container.styles.has(PresentationStylesNew.HORIZONTAL);
  }

  displayAs(): string {
    if (this.container.parent && this.container.parent.contentStyle !== 'page') {
      // container within a container dont need specific styling
      return '';
    } else if (this.container.styles.has(PresentationStylesNew.INTRODUCTION)) {
      return 'introduction';
    } else if (this.container.styles.has(PresentationStylesNew.TRANSPARENT)) {
      return 'transparent';
    }
    return 'card';
  }

}
