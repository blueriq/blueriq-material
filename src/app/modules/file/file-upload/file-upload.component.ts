import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { FileUpload } from '@blueriq/angular/files';
import { Container } from '@blueriq/core';
import { FileUploaderOptions } from 'ng2-file-upload';
import { CustomFileUploader } from './custom-file-uploader';

@Component({
  selector: 'bq-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FileUpload],
})
@BlueriqComponent({
  type: Container,
  selector: 'fileupload',
})
export class FileUploadComponent {

  uploader: CustomFileUploader;
  errorMessage: string;
  isBusy = false;

  constructor(@Self() public fileUpload: FileUpload, @Host() public container: Container) {

    const uploadOptions: FileUploaderOptions = {
      url: this.fileUpload.uploadDetails.url,
      headers: this.fileUpload.uploadDetails.headers,
      additionalParameter: this.getAdditionalParameters(),
      maxFileSize: this.fileUpload.maxFileSize,
      autoUpload: true,
    };

    if (this.fileUpload.allowedExtensions && this.fileUpload.allowedExtensions.length > 0) {
      uploadOptions.allowedFileType = this.fileUpload.allowedExtensions;
    }

    this.uploader = new CustomFileUploader(uploadOptions);

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

  private getAdditionalParameters() {
    const additionalParams = {};
    this.fileUpload.uploadDetails.parts.forEach(part => {
      additionalParams[part.name] = part.body;
    });
    return additionalParams;
  }
}
