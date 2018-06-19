import { Component, Host } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Container, Link } from '@blueriq/core';
import { PresentationStyles } from '../presentationstyles/presentationstyles';
import { DocumentLinkService } from './document-link.service';

@Component({
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: '*:has(* > [type=link])'
})
export class DocumentLinkComponent {

  @BlueriqChild(Link, { descendants: true, required: true })
  public link: Link;

  constructor(
    @Host() public container: Container,
    public documentLinkService: DocumentLinkService,
    private readonly blueriqSession: BlueriqSession) {
  }

  hasButtonPresentationStyle() {
    return this.container.styles.has(PresentationStyles.BUTTON);
  }

  getColor(): string | null {
    if (this.container.styles.has(PresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (this.container.styles.has(PresentationStyles.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }

  getDownloadUrl(): string {
    return this.documentLinkService.getDownloadUrl(this.link, this.blueriqSession);
  }

}
