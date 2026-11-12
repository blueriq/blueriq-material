import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { CommentComponent } from './comment.component';
import { CommentListComponent } from './list/comment.list.component';

export function provideCommentComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      CommentComponent,
      CommentListComponent,
    ]),
  ]);
}
