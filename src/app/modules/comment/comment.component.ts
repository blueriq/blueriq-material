import { Component, inject } from '@angular/core';
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
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: 'storecomment',
})
export class CommentComponent {
  container = inject(Container);
  comment = inject(SubmitComment, { self: true });
  private readonly form = inject(BlueriqFormBuilder);


  formControl = this.form.control(this.comment.commentField, {
    updateOn: 'blur',
    disableWhen: BqPresentationStyles.DISABLED,
  });

  getFieldMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
