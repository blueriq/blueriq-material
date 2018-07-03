import { Component, Self } from '@angular/core';
import { BlueriqComponent, FileUploadContainer } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { CustomFileUploader } from './custom-file-uploader.class';

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

  uploader: CustomFileUploader;
  hasDropZoneOver = false;
  response: string;

  constructor(@Self() public container: FileUploadContainer) {
    this.uploader = new CustomFileUploader({
      url: this.container.getUploadUrl(),
      allowedFileType: this.container.allowedExtensions,
      maxFileSize: (this.container.maxFileSize) ? +this.container.maxFileSize : undefined,
      autoUpload: true
    });
    /**
     * Override uploadAll to use our custom uploader that wraps multiple files in formdata
     * to upload them in one call
     */
    this.uploader.uploadAll = () => this.uploader.uploadAllFiles();
    /**
     * When the upload is completed, the events returned by the runtime need to be handled.
     */
    this.uploader.onCompleteItem = (item: any, response: string, status: any, headers: any) => {
      this.container.handleFileUploadCompleted(response);
    };
  }

  public fileOverDropZone(e: boolean): void {
    this.hasDropZoneOver = e;
  }
}
