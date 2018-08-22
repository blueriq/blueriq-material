import { Component, OnInit } from '@angular/core';
import { BlueriqChildren, BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { CommentEntry } from './CommentEntry';

@Component({
  selector: 'bq-comment-list',
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: 'commentlist'
})
export class CommentListComponent implements OnInit {

  @BlueriqChildren(Container, 'commentEntry', { observe: true })
  entries: Observable<Container[]>;

  commentEntries: CommentEntry[] = [];

  ngOnInit() {
    this.entries.subscribe(entries => {
        this.commentEntries = [];
        for (const entry of entries) {
          this.commentEntries.push(new CommentEntry(entry.properties));
        }
      }
    );
  }

  dateToReadableFormat(date: Date): string {
    if (moment(moment()).diff(moment(date), 'days') >= 6) {
      return moment(date).format('MMMM Do YYYY, hh:mm');
    }
    return moment(date).fromNow(false);
  }

}
