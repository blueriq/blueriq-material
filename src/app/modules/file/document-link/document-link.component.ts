import { Component, Host, Self } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent } from '@blueriq/angular';
import { DocumentLink } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FileDownloadService } from '../file-download/file-download.service';

@Component({
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.scss'],
  providers: [DocumentLink]
})
@BlueriqComponent({
  type: Container,
  selector: '*:has(* > [type=link])'
})
export class DocumentLinkComponent {

  constructor(@Self() public documentLink: DocumentLink,
              @Host() public container: Container,
              private fileDownloadService: FileDownloadService) {
  }

  onClick(): void {
    this.documentLink.getDownloadInfo().subscribe((downloadInfo: AuthorizedDownload) => {
      this.fileDownloadService.download(downloadInfo.url);
    });
  }

  getDisplayText(): string {
    const link = this.documentLink.link;
    if (link.text) {
      return link.text;
    } else if (link.textRef) {
      return link.textRef.plainText;
    }
    return 'download';
  }

  /** Whether the container has the `button` presentation style */
  hasButtonPresentationStyle() {
    return this.container.styles.has(BqPresentationStyles.BUTTON);
  }

  /** The button color, based on presentation styles `Primary` and `Tertiary` */
  getColor(): string | null {
    if (this.container.styles.has(BqPresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (this.container.styles.has(BqPresentationStyles.TERTIARY)) {
      return 'accent';
    } else {
      return null;
    }
  }

}
