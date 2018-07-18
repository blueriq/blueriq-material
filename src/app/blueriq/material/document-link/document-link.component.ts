import { Component, Self } from '@angular/core';
import { BlueriqComponent, DocumentLinkContainer } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { PresentationStyles } from '../presentationstyles/presentationstyles';

@Component({
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.scss'],
  providers: [DocumentLinkContainer]
})
@BlueriqComponent({
  type: Container,
  selector: '*:has(* > [type=link])'
})
export class DocumentLinkComponent {

  constructor(@Self() public container: DocumentLinkContainer) {
  }

  /** Whether the container has the `button` presentation style */
  hasButtonPresentationStyle() {
    return this.container.getPresentationStyles().has(PresentationStyles.BUTTON);
  }

  /** The button color, based on presentation styles `Primary` and `Accent` */
  getColor(): string | null {
    if (this.container.getPresentationStyles().has(PresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (this.container.getPresentationStyles().has(PresentationStyles.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }
}
