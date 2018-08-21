import { Component, OnInit } from '@angular/core';
import { BlueriqChildren, BlueriqComponent, OnUpdate } from '@blueriq/angular';
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
export class CommentListComponent implements OnInit, OnUpdate {

  @BlueriqChildren(Container, 'commentEntry', { observe: true })
  entries: Observable<Container[]>;

  commentEntries: CommentEntry[] = [];

  constructor() {
  }

  ngOnInit() {
    this.entries.subscribe(entries => {
        for (const entry of entries) {
          this.commentEntries.push(new CommentEntry(entry.properties));
        }
      }
    );
  }

  bqOnUpdate() {
    // TODO console.log('update');
  }

  dateToReadableFormat(date: Date): string {
    return moment(date).fromNow(false);
  }

}
