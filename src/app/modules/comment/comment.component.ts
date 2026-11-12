import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { SubmitComment } from '@blueriq/angular/dashboard';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Container, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { BqContainerDirective } from '../../shared/directive/container/bq-container.directive';
import { HeadingComponent } from '../heading/heading.component';
import { MatFormField, MatError } from '@angular/material/form-field';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'bq-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    providers: [SubmitComment],
    imports: [
      BqContainerDirective,
      HeadingComponent,
      MatFormField,
      BqKeyDirective,
      MatInput,
      CdkTextareaAutosize,
      FormsModule,
      ReactiveFormsModule,
      MatError,
      MatButton,
      BlueriqCommonModule,
    ]
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
