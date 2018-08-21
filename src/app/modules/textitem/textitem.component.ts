import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

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
    return this.textItem.styles.hasAny(
      BqPresentationStyles.DANGER,
      BqPresentationStyles.WARNING,
      BqPresentationStyles.INFO,
      BqPresentationStyles.SUCCESS
    );
  }

  public getGutterIcon(): string {
    if (this.textItem.styles.has(BqPresentationStyles.DANGER)) {
      return 'error';
    } else if (this.textItem.styles.has(BqPresentationStyles.WARNING)) {
      return 'warning';
    } else if (this.textItem.styles.has(BqPresentationStyles.INFO)) {
      return 'info';
    } else if (this.textItem.styles.has(BqPresentationStyles.SUCCESS)) {
      return 'check_circle';
    }
    return '';
  }

}
