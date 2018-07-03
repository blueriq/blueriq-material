import { Component, Self } from '@angular/core';
import { BlueriqComponent, FileDownloadContainer } from '@blueriq/angular';
import { Container } from '@blueriq/core';

@Component({
  selector: 'bq-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss'],
  providers: [FileDownloadContainer]
})
@BlueriqComponent({
  type: Container,
  selector: 'filedownload'
})
export class FileDownloadComponent {

  constructor(@Self() public container: FileDownloadContainer) {
  }

}
