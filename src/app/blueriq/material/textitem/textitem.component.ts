import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { PresentationStyles } from '../presentationstyles/presentationstyles';

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
    return this.textItem.styles.has(PresentationStyles.DANGER) ||
      this.textItem.styles.has(PresentationStyles.WARNING) ||
      this.textItem.styles.has(PresentationStyles.INFO) ||
      this.textItem.styles.has(PresentationStyles.SUCCESS);
  }

  public getGutterIcon(): string {
    if (this.textItem.styles.has(PresentationStyles.DANGER)) {
      return 'icon-danger';
    } else if (this.textItem.styles.has(PresentationStyles.WARNING)) {
      return 'icon-warning';
    } else if (this.textItem.styles.has(PresentationStyles.INFO)) {
      return 'icon-info';
    } else if (this.textItem.styles.has(PresentationStyles.SUCCESS)) {
      return 'icon-success';
    }
    return '';
  }

}
