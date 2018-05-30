import { Component, Input } from '@angular/core';
import {Field, FieldMessages} from '@blueriq/core';

@Component({
  selector: 'element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {

  @Input() field : Field; // can be BaseElement?

  private hasMessages() : boolean {
    return this.field.messages.hasMessages;
  }

  private getMessages() : FieldMessages {
    return this.field.messages;
  }

}
