import { Component, inject, OnDestroy } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { FileDownload } from '@blueriq/angular/files';
import { Button, Container } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../button/button.component';
import { FileDownloadService } from './file-download.service';
import { MatButton } from '@angular/material/button';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';
import { MatIcon } from '@angular/material/icon';
import { BqIconDirective } from '../../../shared/directive/icon/icon.directive';

@Component({
  selector: 'bq-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss'],
  providers: [FileDownload, { provide: Button, useFactory: () => inject(FileDownload).downloadButton }],
  imports: [MatButton, BqKeyDirective, MatIcon, BqIconDirective]
})
@BlueriqComponent({
  type: Container,
  selector: 'filedownload',
})
export class FileDownloadComponent extends ButtonComponent implements OnDestroy {
  fileDownload = inject(FileDownload, { self: true });
  fileDownloadService = inject(FileDownloadService);

  downloadSubscription: Subscription | undefined;

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
