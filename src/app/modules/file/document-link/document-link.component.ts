import { Component, OnDestroy, Self } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent } from '@blueriq/angular';
import { DocumentLink } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FileDownloadService } from '../file-download/file-download.service';

@Component({
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.scss'],
  providers: [DocumentLink],
})
@BlueriqComponent({
  type: Container,
  selector: '*:has(* > [type=link])',
})
export class DocumentLinkComponent implements OnDestroy {

  downloadSubscription: Subscription | undefined;

  constructor(@Self() public documentLink: DocumentLink,
              public container: Container,
              private fileDownloadService: FileDownloadService) {
  }

  onClick(): void {
    this.downloadSubscription = this.documentLink.getDownloadInfo()
      .subscribe((downloadInfo: AuthorizedDownload) => {
        this.fileDownloadService.download(downloadInfo.url);
      });
  }

  getDisplayText(): string {
    return this.documentLink.link.text;
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
    }
    return null;
  }

  ngOnDestroy() {
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

}
