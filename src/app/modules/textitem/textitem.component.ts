import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { PresentationStylesNew } from '../PresentationStylesNew';

@Component({
  templateUrl: './textitem.component.html',
  styleUrls: ['./textitem.component.scss']
})

@BlueriqComponent({
  type: TextItem
})

export class TextItemComponent {

  constructor(@Host() public textItem: TextItem) {
  }

  public shouldDisplayGutter(): boolean {
    return this.textItem.styles.has(PresentationStylesNew.DANGER) ||
      this.textItem.styles.has(PresentationStylesNew.WARNING) ||
      this.textItem.styles.has(PresentationStylesNew.INFO) ||
      this.textItem.styles.has(PresentationStylesNew.SUCCESS);
  }

  public getGutterIcon(): string {
    if (this.textItem.styles.has(PresentationStylesNew.DANGER)) {
      return 'error';
    } else if (this.textItem.styles.has(PresentationStylesNew.WARNING)) {
      return 'warning';
    } else if (this.textItem.styles.has(PresentationStylesNew.INFO)) {
      return 'info';
    } else if (this.textItem.styles.has(PresentationStylesNew.SUCCESS)) {
      return 'check_circle';
    }
    return '';
  }

}
