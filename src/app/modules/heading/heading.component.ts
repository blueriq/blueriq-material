import { Component, Input, inject, input } from '@angular/core';
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


  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input()
  title: string;

  readonly styles = input<PresentationStyles>(undefined!);

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

}
