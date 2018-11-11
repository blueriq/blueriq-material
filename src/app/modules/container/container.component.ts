import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-container',
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

  public isHorizontal = false;

  constructor(@Host() public container: Container) {
  }

  ngOnInit() {
    this.determineDisplayStyle();
  }

  bqOnUpdate() {
    this.determineDisplayStyle();
  }

  /**
   * Finds presentation styles to determine if it is a horizontal view
   */
  private determineDisplayStyle() {
    this.isHorizontal = this.container.styles.has(BqPresentationStyles.HORIZONTAL);
  }

}
