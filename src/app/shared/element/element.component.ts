import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getBlueriqField, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { PresentationStyles } from '../../blueriq/material/presentationstyles/presentationstyles';

@Component({
  selector: 'bq-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {

  @Input() control: FormControl;

  get field(): Field {
    return getBlueriqField(this.control)!;
  }

  hasMessages(): boolean {
    return getFieldMessages(this.control).hasMessages;
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.control);
  }

  hasPresentationStyleExplainIcon(): boolean {
    return this.field.styles.has(PresentationStyles.EXPLAINICON);
  }

  shouldDisplayExplainText(): boolean {
    if (!this.hasPresentationStyleExplainIcon()) {
      return false;
    }
    if (this.field.readonly) {
      return false;
    }
    if (this.field.explainText) {
      return this.field.explainText.length > 0;
    }
    return false;
  }

}
