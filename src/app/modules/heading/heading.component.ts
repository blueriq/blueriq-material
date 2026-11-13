import { Component, inject, input } from '@angular/core';
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


  readonly title = input<string>();

  readonly styles = input.required<PresentationStyles>();

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

}
