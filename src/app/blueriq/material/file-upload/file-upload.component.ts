import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession, UploadService } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'bq-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: '[contentStyle=fileupload]'
})
export class FileUploadComponent {

  public uploader: FileUploader;
  hasDropZoneOver = false;
  multiple = true;

  constructor(@Host() private container: Container, private readonly session: BlueriqSession,
              private readonly uploadService: UploadService) {
    const URL = uploadService.getUploadUrl(session.sessionId, this.container.properties.configurationid);
    this.uploader = new FileUploader({
      url: URL,
      allowedFileType: this.container.properties.allowedextensions.split('|'),
      maxFileSize: this.container.properties.maxfilesize,
      autoUpload: true
    });
  }

  public fileOverDropZone(e: boolean): void {
    this.hasDropZoneOver = e;
  }

  getUploadLabel(): string {
    if (this.container.properties.singleFileMode) {
      this.multiple = false;
      return this.container.properties.singleuploadlabel;
    }
    return this.container.properties.multiuploadlabel;
  }

  getMaxFileSize(): string {
    const fileSizeDescription = this.container.properties.filesizedescription;
    const maxFileSize = this.humanReadableFileSize(this.container.properties.maxfilesize, 0);
    return fileSizeDescription.replace('{0}', maxFileSize);
  }

  getAllowedExtensions(): string {
    const extensionDescription = this.container.properties.extensiondescription;
    const allowedExtensions: string = this.container.properties.allowedextensions.split('|').join(', ');
    return extensionDescription.replace('{0}', allowedExtensions);
  }

  humanReadableFileSize(sizeInBytes: number, precision: number = 2): string {
    const FILE_SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB'];
    let unit = 0;
    while (sizeInBytes >= 1024) {
      sizeInBytes /= 1024;
      unit++;
    }
    return sizeInBytes.toFixed(precision) + ' ' + FILE_SIZE_UNITS[unit];
  }
}
