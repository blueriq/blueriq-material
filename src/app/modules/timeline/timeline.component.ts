import { Component } from '@angular/core';
import { BlueriqComponent, BlueriqSession, DashboardTimeline } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import * as moment from 'moment';
import { parseBqDateTimePattern, parseBqLocale } from '../../configuration/date/bq-date-parser';

@Component({
  selector: 'bq-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [DashboardTimeline]
})
@BlueriqComponent({
  type: Container,
  selector: 'timeline'
})
export class TimelineComponent {

  constructor(public readonly timeline: DashboardTimeline, private readonly session: BlueriqSession) {
  }

  dateToReadableFormat(date: Date): string {
    moment.locale(parseBqLocale(this.session));
    const bqDateTime = parseBqDateTimePattern(this.session);
    const mdate = moment(date, bqDateTime.dateTimePattern);
    if (moment().diff(mdate, 'days') >= 7) {
      return mdate.format('LLL');
    }
    return mdate.fromNow(false);
  }

  dateToTimestamp(date: Date): string {
    return moment(date).format('HH:mm');
  }

}
