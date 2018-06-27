import { HttpClient } from '@angular/common/http';
import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession, DownloadService } from '@blueriq/angular';
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

  constructor(@Host() private container: Container, private readonly session: BlueriqSession, private http: HttpClient, private readonly downloadService: DownloadService) {
    this.downloadButton = this.container.children[0] as Button;
  }

  download() {
    try {
      let url = this.downloadService.getDownloadUrl(this.session.sessionId, this.container.properties.configurationid);
      window.location.href = url;
    } catch (error) {
      // not authorized
    }
  }
}
