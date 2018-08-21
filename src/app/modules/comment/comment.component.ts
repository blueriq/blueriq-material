import { Component, Host, OnInit } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Button, Container, Field } from '@blueriq/core';

@Component({
  selector: 'bq-comment',
  templateUrl: './comment.component.html'
})
@BlueriqComponent({
  type: Container,
  selector: 'storecomment'
})
export class CommentComponent implements OnInit {

  @BlueriqChild(Field, { required: true })
  commentField: Field;

  @BlueriqChild(Button, { required: true })
  commentButton: Button;

  constructor(@Host() public container: Container, private form: BlueriqFormBuilder, public session: BlueriqSession) {
  }

  ngOnInit() {
  }

  // TODO
  // onClick() {
  //   this.session.pressed(this.commentButton);
  // }

}
