import { Component, Self } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { FileUpload } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { CustomFileUploader } from './custom-file-uploader.class';

@Component({
  selector: 'bq-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FileUpload]
})
@BlueriqComponent({
  type: Container,
  selector: 'fileupload'
})
export class FileUploadComponent {

  uploader: CustomFileUploader;
  hasDropZoneOver = false;

  constructor(@Self() public fileUpload: FileUpload) {
    this.uploader = new CustomFileUploader({
      url: this.fileUpload.uploadUrl,
      allowedFileType: this.fileUpload.allowedExtensions,
      maxFileSize: this.fileUpload.maxFileSize,
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
      this.fileUpload.handleFileUploadCompleted(response);
    };
  }

  public fileOverDropZone(e: boolean): void {
    this.hasDropZoneOver = e;
  }
}
