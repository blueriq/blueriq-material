import { Component, inject } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { FileUpload } from '@blueriq/angular/files';
import { Container, Element, Field, TextItem } from '@blueriq/core';
import { CustomFileUploader, CustomFileUploaderOptions } from './custom-file-uploader';

@Component({
    selector: 'bq-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [FileUpload],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: 'fileupload',
})
export class FileUploadComponent {
  bqFileUpload = inject(FileUpload, { self: true });
  container = inject(Container);


  // Error messages due to validation on the server side
  @BlueriqChild(Container, '[name=errorMessages]', { optional: true })
  bqFileUploadErrorMessages: Container;

  // Field for the required state of the container
  @BlueriqChild(Field, '[name=required]', { optional: true })
  bqFileUploadRequired: Field;

  ngFileUploader: CustomFileUploader;
  // Error message due to validation on the client side
  ngFileUploadErrorMessage: string;
  isBusy = false;

  constructor() {
    this.ngFileUploader = new CustomFileUploader({ autoUpload: true, ...this.getCurrentOptions() });

    /**
     * When the upload starts, reconfigure the ngFileUploader to send along the most up-to-date upload details.
     */
    this.ngFileUploader.onBuildItemForm = () => {
      this.ngFileUploader.setOptions(this.getCurrentOptions());
    };

    /**
     * When adding a file is done hide the progress bar
     * */
    this.ngFileUploader.onAfterAddingFile = () => {
      this.isBusy = true;
    };

    /**
     * When the upload is completed, the events returned by the runtime need to be handled.
     */
    this.ngFileUploader.onCompleteItem = (item, body, status, headers) => {
      // Uploading succeeded from the client side perspective so clear its error message
      this.ngFileUploadErrorMessage = '';
      this.isBusy = false;
      this.bqFileUpload.handleFileUploadCompleted({
        body,
        status,
        headers: Object.entries(headers).map(([name, value]) => ({ name, value })),
      });
      this.ngFileUploader.clearQueue();
    };

    /**
     * Set an error message when adding an item did not match the (client-side) filter
     */
    this.ngFileUploader.onWhenAddingFileFailed = (item, filter) => {
      switch (filter.name) {
        case 'fileType':
          this.ngFileUploadErrorMessage = this.bqFileUpload.extensionInvalidValidationMessage;
          break;
        case 'fileSize':
          this.ngFileUploadErrorMessage = this.bqFileUpload.fileTooLargeValidationMessage;
          break;
        case 'queueLimit':
          this.ngFileUploadErrorMessage = this.bqFileUpload.maxFileAmountValidationMessage;
          break;
        default:
          this.ngFileUploadErrorMessage = 'File could not be uploaded';
          break;
      }
    };

    this.ngFileUploader.onWhenMaxFilesExceeded = () => {
      this.ngFileUploadErrorMessage = this.bqFileUpload.maxFileAmountValidationMessage;
      this.isBusy = false;
    };

  }

  asTextItem(element: Element): TextItem {
    return element as TextItem;
  }

  allowedExtensions(extensions: string[] | undefined): string[] | undefined {
    if (extensions === undefined) {
      return undefined;
    }
    return extensions.map(param => `.${ param }`);
  }

  private getCurrentOptions(): CustomFileUploaderOptions {
    const details = this.bqFileUpload.getUploadDetails();

    return {
      filters: [],
      url: details.url,
      headers: details.headers,
      additionalParameter: details.parts.reduce((params, part) => {
        params[part.name] = part.body;
        return params;
      }, {}),
      maxFileSize: this.bqFileUpload.maxFileSize,
      allowedFileType: this.bqFileUpload.allowedExtensions,
      maxFiles: this.bqFileUpload.maxFileAmount,
    };
  }

}
