import { Component, Self } from '@angular/core';
import { BlueriqComponent, DashboardCommentList } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import * as moment from 'moment';

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

  constructor(@Self() public readonly commentList: DashboardCommentList) {
  }

  dateToReadableFormat(date: Date): string {
    const mdate = moment(date);
    if (moment().diff(mdate, 'days') >= 6) {
      return mdate.format('MMMM Do YYYY, hh:mm');
    }
    return mdate.fromNow(false);
  }

}
