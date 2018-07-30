import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { Container, Page } from '@blueriq/core';
import { PresentationStylesNew } from '../PresentationStylesNew';

type ContainerDisplayMode = '' | 'introduction' | 'transparent' | 'card';

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
export class ContainerComponent implements OnInit, OnUpdate {

  public displayMode: ContainerDisplayMode;
  public horizontal = false;

  constructor(@Host() public container: Container) {
  }

  ngOnInit() {
    this.determineDisplayStyle();
  }

  bqOnUpdate() {
    this.determineDisplayStyle();
  }

  /**
   * Finds presentation styles to determine the look-and-feel of the container
   */
  private determineDisplayStyle() {
    this.horizontal = this.container.styles.has(PresentationStylesNew.HORIZONTAL);

    if (this.container.parent && !(this.container.parent instanceof Page)) {
      // container within a container doesn't need specific styling
      this.displayMode = '';
    } else if (this.container.styles.has(PresentationStylesNew.INTRODUCTION)) {
      this.displayMode = 'introduction';
    } else if (this.container.styles.has(PresentationStylesNew.TRANSPARENT)) {
      this.displayMode = 'transparent';
    } else {
      this.displayMode = 'card';
    }
  }
}
