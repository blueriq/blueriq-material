import { Component, Self } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { FileUpload } from '@blueriq/angular/files';
import { Container, Element, TextItem } from '@blueriq/core';
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

  // Error messages due to validation on the server side
  @BlueriqChild(Container, '[name=errorMessages]', { optional: true })
  bqFileUploadErrorMessages: Container;

  ngFileUploader: CustomFileUploader;
  // Error message due to validation on the client side
  ngFileUploadErrorMessage: string;
  isBusy = false;

  constructor(@Self() public bqFileUpload: FileUpload, public container: Container) {
    this.ngFileUploader = new CustomFileUploader({ autoUpload: true });
    // Also configure ngFileUploader on construction because file validation is done BEFORE onBuildItemForm()
    this.setNgFileUploaderOptions();

    /**
     * When the upload starts, reconfigure the ngFileUploader to send along the most up-to-date upload details.
     */
    this.ngFileUploader.onBuildItemForm = () => {
      this.setNgFileUploaderOptions();
    };

    /**
     * When adding a file is done hide the progress bar
     * */
    this.ngFileUploader.onAfterAddingFile = (file) => {
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
     * Set a error message when adding a item did not match the (client-side) filter
     */
    this.ngFileUploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileType':
          this.ngFileUploadErrorMessage = this.bqFileUpload.extensionInvalidValidationMessage;
          break;
        case 'fileSize':
          this.ngFileUploadErrorMessage = this.bqFileUpload.fileTooLargeValidationMessage;
          break;
        default:
          this.ngFileUploadErrorMessage = 'File could not be uploaded';
          break;
      }
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

  private setNgFileUploaderOptions() {
    const details = this.bqFileUpload.getUploadDetails();

    this.ngFileUploader.setOptions({
      filters: [],
      url: details.url,
      headers: details.headers,
      additionalParameter: details.parts.reduce((params, part) => {
        params[part.name] = part.body;
        return params;
      }, {}),
      maxFileSize: this.bqFileUpload.maxFileSize,
      allowedFileType: this.bqFileUpload.allowedExtensions,
    });
  }

}
