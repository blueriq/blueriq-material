import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession, DownloadInfo, DownloadService } from '@blueriq/angular';
import { Button, Container } from '@blueriq/core';

@Component({
  selector: 'bq-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: '[contentStyle=filedownload]'
})
export class FileDownloadComponent {

  downloadButton: Button;
  showError: string;

  constructor(@Host() private container: Container, private readonly session: BlueriqSession,
              private readonly downloadService: DownloadService) {
    this.downloadButton = this.container.children[0] as Button;
  }

  download(): void {
    this.downloadService.getDownloadInfo(this.session.sessionId,
      this.container.properties.configurationid).subscribe((data: DownloadInfo) => {
      if (data.type === 'authorized') {
        window.location.href = data.url;
      } else if (data.type === 'unauthorized') {
        this.showError = 'UNAUTHORIZED';
      } else if (data.type === 'error') {
        this.showError = data.errorMessage;
      } else {
        this.showError = 'WHAT HAPPENED?';
      }
    }, error => console.error(error), () => console.log('completed'));
  }
}
