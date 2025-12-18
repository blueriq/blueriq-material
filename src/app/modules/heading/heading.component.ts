import { Component, Input } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { PresentationStyles } from '@blueriq/core';

@Component({
    selector: 'bq-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss'],
    standalone: false
})
export class HeadingComponent {

  @Input()
  title: string;

  @Input()
  styles: PresentationStyles;

  constructor(private readonly blueriqSession: BlueriqSession) {
  }

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

}
