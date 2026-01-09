import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Timeline } from '@blueriq/angular/dashboard';
import { Container } from '@blueriq/core';
import { dateFromNowHumanReadable, dateToShortTime } from '@shared/date/bq-date-parser';

@Component({
    selector: 'bq-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    providers: [Timeline],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: 'timeline',
})
export class TimelineComponent {
  container = inject(Container);
  readonly timeline = inject(Timeline);
  private readonly session = inject(BlueriqSession);


  dateToHumanReadableFormat(date: Date): string {
    return dateFromNowHumanReadable(date, this.session.localization, false);
  }

  dateToShortTime(date: Date): string {
    return dateToShortTime(date, this.session.localization);
  }
}
