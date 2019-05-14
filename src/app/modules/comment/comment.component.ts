import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { SubmitComment } from '@blueriq/angular/dashboard';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Container, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [SubmitComment],
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
              @Self() public comment: SubmitComment,
              private form: BlueriqFormBuilder) {
  }

  getFieldMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
