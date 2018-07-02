import { Component, Self } from '@angular/core';
import { BlueriqComponent, FileUploadContainer } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'bq-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FileUploadContainer]
})
@BlueriqComponent({
  type: Container,
  selector: 'fileupload'
})
export class FileUploadComponent {

  public uploader: FileUploader;
  hasDropZoneOver = false;
  multiple = true;

  constructor(@Self() private container: FileUploadContainer) {
    this.uploader = new FileUploader({
      url: this.container.getUploadUrl(),
      allowedFileType: this.container.allowedExtensions,
      maxFileSize: (this.container.maxFileSize) ? +this.container.maxFileSize : undefined,
      autoUpload: true
    });
  }

  public fileOverDropZone(e: boolean): void {
    this.hasDropZoneOver = e;
  }
}
