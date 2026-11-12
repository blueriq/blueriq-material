import { Component, Input, inject } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { PresentationStyles } from '@blueriq/core';
import { MatIcon } from '@angular/material/icon';
import { BqIconDirective } from '../../shared/directive/icon/icon.directive';

@Component({
    selector: 'bq-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss'],
    imports: [MatIcon, BqIconDirective]
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
