import { Component, Self } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { FileDownloadService } from '../../generic/file-download.service';

@Component({
  selector: 'bq-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss'],
  providers: [FileDownload]
})
@BlueriqComponent({
  type: Container,
  selector: 'filedownload'
})
export class FileDownloadComponent {

  constructor(@Self() public fileDownload: FileDownload,
              private fileDownloadService: FileDownloadService) {
  }

  download(): void {
    this.fileDownload.getDownloadInfo().subscribe((downloadInfo: AuthorizedDownload) => {
      this.fileDownloadService.download(downloadInfo.url);
    });
  }

}
