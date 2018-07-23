import { Component, Host, Self } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent } from '@blueriq/angular';
import { DocumentLink } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { PresentationStylesNew } from '../../PresentationStylesNew';
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

  download(): void {
    this.documentLink.getDownloadInfo().subscribe((downloadInfo: AuthorizedDownload) => {
      this.fileDownloadService.download(downloadInfo.url);
    });
  }

  /** Whether the container has the `button` presentation style */
  hasButtonPresentationStyle() {
    return this.container.styles.has(PresentationStylesNew.BUTTON);
  }

  /** The button color, based on presentation styles `Primary` and `Accent` */
  getColor(): string | null {
    if (this.container.styles.has(PresentationStylesNew.PRIMARY)) {
      return 'primary';
    } else if (this.container.styles.has(PresentationStylesNew.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }
}
