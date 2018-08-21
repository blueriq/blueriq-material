import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { FileUpload } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { CustomFileUploader } from './custom-file-uploader';

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
  errorMessage: string;
  isBusy = false;

  constructor(@Self() public fileUpload: FileUpload, @Host() public container: Container) {

    this.uploader = new CustomFileUploader({
      url: this.fileUpload.uploadUrl,
      allowedFileType: this.fileUpload.allowedExtensions,
      maxFileSize: this.fileUpload.maxFileSize,
      autoUpload: true
    });

    /**
     * When adding a file is done hide the progress bar
     * */
    this.uploader.onAfterAddingFile = (file) => {
      this.isBusy = true;
    };

    /**
     * When the upload is completed, the events returned by the runtime need to be handled.
     */
    this.uploader.onCompleteItem = (item: any, response: string, status: any, headers: any) => {
      this.errorMessage = '';
      this.isBusy = false;
      this.fileUpload.handleFileUploadCompleted(response);
      this.uploader.clearQueue();
    };

    /**
     * Set a error message when adding a item did not match the filter
     */
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileType':
          this.errorMessage = this.fileUpload.extensionInvalidValidationMessage;
          break;
        case 'fileSize':
          this.errorMessage = this.fileUpload.fileTooLargeValidationMessage;
          break;
        default:
          this.errorMessage = 'File could not be uploaded';
          break;
      }
    };

  }
}
