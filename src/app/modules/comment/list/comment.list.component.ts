import { Component, Self } from '@angular/core';
import { BlueriqComponent, BlueriqSession, DashboardCommentList } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import * as moment from 'moment';
import { parseBqDateTimePattern, parseBqLocale } from '../../../configuration/date/bq-date-parser';

@Component({
  selector: 'bq-comment-list',
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.scss'],
  providers: [DashboardCommentList]
})
@BlueriqComponent({
  type: Container,
  selector: 'commentlist'
})
export class CommentListComponent {

  constructor(@Self() public readonly commentList: DashboardCommentList, private readonly session: BlueriqSession) {
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
}
