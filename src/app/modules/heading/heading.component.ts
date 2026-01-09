import { Component, Input, inject } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { PresentationStyles } from '@blueriq/core';

@Component({
    selector: 'bq-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss'],
    standalone: false
})
export class HeadingComponent {
  private readonly blueriqSession = inject(BlueriqSession);


  @Input()
  title: string;

  @Input()
  styles: PresentationStyles;

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

}
