import { Component, Host, OnInit, Self } from '@angular/core';
import { BlueriqComponent, BlueriqSession, DashboardComment } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [DashboardComment]
})
@BlueriqComponent({
  type: Container,
  selector: 'storecomment'
})
export class CommentComponent implements OnInit {

  constructor(@Host() public container: Container,
              @Self() public comment: DashboardComment,
              public session: BlueriqSession) {
  }

  ngOnInit() {
    // Because there is no other way of telling that the comment field should be displayed as a large text field,
    // the presentation style is given so it would render is such
    this.comment.commentField.styles = this.comment.commentField.styles.add(BqPresentationStyles.LARGETEXT);
  }

  onClick() {
    this.comment.comment();
  }

}
