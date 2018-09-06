import { Component } from '@angular/core';
import { BlueriqChildren, BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';

@Component({
  selector: 'bq-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: 'timeline'
})
export class TimelineComponent {

  @BlueriqChildren(Container, 'timelineEntry')
  entries: Container;

  constructor() {

  }

}
