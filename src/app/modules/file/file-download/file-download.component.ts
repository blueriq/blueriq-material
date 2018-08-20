import { Component, Host, OnDestroy, Optional, Self, ViewEncapsulation } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { Table } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Subscription } from 'rxjs/Subscription';
import { ButtonComponent } from '../../button/button.component';
import { FileDownloadService } from './file-download.service';

@Component({
  selector: 'bq-file-download',
  templateUrl: '../../button/button.component.html',
  styleUrls: ['../../button/button.component.scss'],
  providers: [FileDownload],
  encapsulation: ViewEncapsulation.None
})
@BlueriqComponent({
  type: Container,
  selector: 'filedownload'
})
export class FileDownloadComponent extends ButtonComponent implements OnDestroy {

  downloadSubscription: Subscription | undefined;

  constructor(@Self() public fileDownload: FileDownload,
              public session: BlueriqSession,
              @Optional() @Host() public readonly table: Table,
              public fileDownloadService: FileDownloadService) {
    super(fileDownload.downloadButton, session, table);
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
