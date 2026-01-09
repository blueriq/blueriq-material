import { Component, inject, OnDestroy } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../button/button.component';
import { FileDownloadService } from './file-download.service';

@Component({
  selector: 'bq-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss'],
  providers: [FileDownload],
  standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: 'filedownload',
})
export class FileDownloadComponent extends ButtonComponent implements OnDestroy {
  fileDownload: FileDownload;
  fileDownloadService = inject(FileDownloadService);


  downloadSubscription: Subscription | undefined;

  constructor() {
    const fileDownload = inject(FileDownload, { self: true });
    const list = inject(List, { optional: true });

    super(fileDownload.downloadButton, list);

    this.fileDownload = fileDownload;
  }

  onClick(): void {
    this.downloadSubscription = this.fileDownload.getDownloadInfo().subscribe(downloadInfo => {
      this.fileDownloadService.download(downloadInfo.url);
    });
  }

  ngOnDestroy() {
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

}
