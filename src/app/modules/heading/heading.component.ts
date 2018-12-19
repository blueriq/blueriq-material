import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { PresentationStyles } from '@blueriq/core';

@Component({
  selector: 'bq-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {

  @Input()
  title: string;

  @Input()
  styles: PresentationStyles;

  constructor(@Optional() @SkipSelf() public readonly list: List,
              public blueriqSession: BlueriqSession) {
  }

}
