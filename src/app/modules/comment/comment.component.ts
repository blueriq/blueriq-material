import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, DashboardComment } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Container } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [DashboardComment],
})
@BlueriqComponent({
  type: Container,
  selector: 'storecomment',
})
export class CommentComponent {

  formControl = this.form.control(this.comment.commentField, {
    updateOn: 'blur',
    disableWhen: BqPresentationStyles.DISABLED,
  });

  constructor(@Host() public container: Container,
              @Self() public comment: DashboardComment,
              private form: BlueriqFormBuilder) {
  }

  onClick() {
    this.comment.comment();
  }
}
