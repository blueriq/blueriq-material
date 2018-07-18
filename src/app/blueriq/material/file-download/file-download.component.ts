import { Component, Self } from '@angular/core';
import { AuthorizedDownload, BlueriqComponent } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';

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

  constructor(@Self() public fileDownload: FileDownload) {
  }

  download(): void {
    this.fileDownload.getDownloadInfo().subscribe((downloadInfo: AuthorizedDownload) => {
      window.location.href = downloadInfo.url;
    });
  }

}
