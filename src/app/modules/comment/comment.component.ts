import { Component, Host, OnInit } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button, Container, Field } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: 'storecomment'
})
export class CommentComponent implements OnInit {

  @BlueriqChild(Field)
  commentField: Field;

  @BlueriqChild(Button)
  public commentButton: Button;

  constructor(@Host() public container: Container, public session: BlueriqSession) {
  }

  ngOnInit() {
    // Since the field in comment cannot have a questiontext, the caption of the button will be given.
    this.commentField.questionText = this.commentButton.caption;
    // Because there is no other way of telling that the comment field should be displayed as a large text field,
    // the presentation style is given so it would render is such
    this.commentField.styles = this.commentField.styles.add(BqPresentationStyles.LARGETEXT);
  }

  onClick() {
    if (this.commentField.getValue()) {
      const parameters = {};
      parameters[this.commentField.name] = [this.commentField.getValue()];
      this.session.pressed(this.commentButton, parameters);
    }
  }

}
