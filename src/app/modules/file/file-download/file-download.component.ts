import { Component, Host, Optional, Self, ViewEncapsulation } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { Table } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
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
export class FileDownloadComponent extends ButtonComponent {

  constructor(@Self() public fileDownload: FileDownload,
              session: BlueriqSession,
              @Optional() @Host() public readonly table: Table,
              private fileDownloadService: FileDownloadService) {
    super(fileDownload.downloadButton, session, table);
  }

  /* Overrides */
  onClick(): void {
    this.fileDownload.getDownloadInfo().subscribe((downloadInfo: AuthorizedDownload) => {
      console.log(downloadInfo);
      this.fileDownloadService.download(downloadInfo.url);
    });
  }

}
