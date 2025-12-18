import { Component } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
    selector: 'bq-textitem',
    templateUrl: './textitem.component.html',
    styleUrls: ['./textitem.component.scss'],
    standalone: false
})
@BlueriqComponent({
  type: TextItem,
})
export class TextItemComponent implements OnUpdate {
  /**
   * Whether or not the text item has content in its nodes.  If not, only the plain text is displayed instead.
   */
  hasStyledContent: boolean;

  constructor(public textItem: TextItem) {
    this.hasStyledContent = this.determineHasStyledContent();
  }

  bqOnUpdate(): void {
    this.hasStyledContent = this.determineHasStyledContent();
  }

  public shouldDisplayGutter(): boolean {
    return this.textItem.styles.hasAny(
      BqPresentationStyles.DANGER,
      BqPresentationStyles.WARNING,
      BqPresentationStyles.INFO,
      BqPresentationStyles.SUCCESS,
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

  private determineHasStyledContent() {
    return this.textItem.rootNode.toPlainText() !== '';
  }

}
