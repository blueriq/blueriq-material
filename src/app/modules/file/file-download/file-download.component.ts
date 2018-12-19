import { Component, Host, OnDestroy, Optional, Self } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Subscription } from 'rxjs/Subscription';
import { ButtonComponent } from '../../button/button.component';
import { FileDownloadService } from './file-download.service';

@Component({
  selector: 'bq-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss'],
  providers: [FileDownload],
})
@BlueriqComponent({
  type: Container,
  selector: 'filedownload',
})
export class FileDownloadComponent extends ButtonComponent implements OnDestroy {

  downloadSubscription: Subscription | undefined;

  constructor(@Self() public fileDownload: FileDownload,
              @Optional() @Host() public readonly list: List,
              public fileDownloadService: FileDownloadService) {
    super(fileDownload.downloadButton, list);
  }

  /* Overrides */
  onClick(): void {
    this.downloadSubscription = this.fileDownload.getDownloadInfo()
    .subscribe((downloadInfo: AuthorizedDownload) => {
      this.fileDownloadService.download(downloadInfo.url);
    });
  }

  ngOnDestroy() {
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

}
