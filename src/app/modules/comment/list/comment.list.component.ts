import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { CommentList } from '@blueriq/angular/dashboard';
import { Container } from '@blueriq/core';
import { dateFromNowHumanReadable } from '@shared/date/bq-date-parser';
import { MatList } from '@angular/material/list';
import { MatCardSubtitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'bq-comment-list',
    templateUrl: './comment.list.component.html',
    styleUrls: ['./comment.list.component.scss'],
    providers: [CommentList],
    imports: [MatList, MatCardSubtitle, MatDivider, AsyncPipe]
})
@BlueriqComponent({
  type: Container,
  selector: 'commentlist',
})
export class CommentListComponent {
  readonly commentList = inject(CommentList, { self: true });
  private readonly session = inject(BlueriqSession);


  dateToHumanReadableFormat(date: Date): string {
    return dateFromNowHumanReadable(date, this.session.localization);
  }
}
