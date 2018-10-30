import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, DashboardComment } from '@blueriq/angular';
import { Container } from '@blueriq/core';

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
export class CommentComponent {

  constructor(@Host() public container: Container,
              @Self() public comment: DashboardComment) {
  }

  onClick() {
    this.comment.comment();
  }
}
