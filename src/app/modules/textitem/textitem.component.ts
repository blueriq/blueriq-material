import { Component, inject } from '@angular/core';
import { BlueriqComponent, OnUpdate, BlueriqCommonModule } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { MatIcon } from '@angular/material/icon';
import { TextItemModule } from '@blueriq/angular/textitems';

@Component({
    selector: 'bq-textitem',
    templateUrl: './textitem.component.html',
    styleUrls: ['./textitem.component.scss'],
    imports: [BqKeyDirective, BlueriqCommonModule, MatIcon, TextItemModule]
})
@BlueriqComponent({
  type: TextItem,
})
export class TextItemComponent implements OnUpdate {
  textItem = inject(TextItem);

  /**
   * Whether or not the text item has content in its nodes.  If not, only the plain text is displayed instead.
   */
  hasStyledContent: boolean;

  constructor() {
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
