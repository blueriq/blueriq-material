import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UploadDetails } from '@blueriq/angular';
import { FileUpload } from '@blueriq/angular/files';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { FileItem, FileLikeObject, FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { FileModule } from '../file.modules';
import { CustomFileUploader } from './custom-file-uploader';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {

  let properties: { [name: string]: any };
  let container: ContainerTemplate;
  let component: ComponentFixture<FileUploadComponent>;
  let session: BlueriqTestSession;

  let directiveElement: DebugElement;
  let fileSelectDirective: FileSelectDirective;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        FileModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    properties = {
      'allowedextensions': 'txt|doc',
      'maxfilesize': '1337',
      'extensiondescription': 'Allowed file extensions are: {0}',
      'filesizedescription': 'Maximum file size is: {0}',
      'fileamountdescription': 'Allowed amount of files: {0}',
      'maxfileamount': '1',
      'extensionvalidationmessage': 'File extension not allowed',
      'filesizevalidationmessage': 'File is too large',
      'fileamountvalidationmessage': 'The Maximum amount of files is exceeded',
      'singleuploadlabel': 'Add file...',
      'multiuploadlabel': 'Add files...',
    };
    container = ContainerTemplate.create()
    .contentStyle('fileupload')
    .properties(properties)
    .children(
      ButtonTemplate.create('FileUploaded'),
      ButtonTemplate.create('Unauthorized'),
      FieldTemplate.text('required').required(true),
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FileUploadComponent);

    directiveElement = component.debugElement.query(By.directive(FileSelectDirective));
    fileSelectDirective = directiveElement.injector.get(FileSelectDirective);
  });

  it('handles change event', () => {
    spyOn(fileSelectDirective.uploader!, 'addToQueue');
    fileSelectDirective.onChange();
    expect(fileSelectDirective.uploader!.addToQueue).toHaveBeenCalled();
  });

  it('should show progress bar when needed', () => {
    expect(component.componentInstance.isBusy).toBe(false);
    let progressBar = component.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeFalsy();

    // Sut
    fileSelectDirective.uploader!.onAfterAddingFile(createFile());
    fileSelectDirective.uploader!.progress = 33;
    component.detectChanges();

    // Verify
    expect(component.componentInstance.isBusy).toBe(true);
    progressBar = component.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeTruthy();
    expect(progressBar.getAttribute('ng-reflect-value')).toBe('33');
  });

  it('should display a hint messages for the upload criteria', () => {
    // Init
    const hints = component.nativeElement.querySelectorAll('mat-hint');

    // Verify
    expect(hints.length).toBe(3);
    expect(hints[0].innerHTML).toBe(component.componentInstance.bqFileUpload.allowedExtensionsDescription);
    expect(hints[1].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileSizeDescription);
    expect(hints[2].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileAmountDescription);
  });

  it('should not display an extension hint when all extensions are allowed', () => {
    // Init
    session.update(
      container.properties({ ...properties, allowedextensions: '' }),
    );
    const hints = component.nativeElement.querySelectorAll('mat-hint');

    // Verify
    expect(hints.length).toBe(2);
    expect(hints[0].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileSizeDescription);
    expect(hints[1].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileAmountDescription);
  });

  it('should not display a file amount hint when there is no limit', () => {
    // Init
    session.update(
      container.properties({ ...properties, maxfileamount: '-1' }),
    );
    const hints = component.nativeElement.querySelectorAll('mat-hint');

    // Verify
    expect(hints.length).toBe(2);
    expect(hints[0].innerHTML).toBe(component.componentInstance.bqFileUpload.allowedExtensionsDescription);
    expect(hints[1].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileSizeDescription);
  });

  it('should not display a file amount hint when the old multi mode file option is used', () => {
    // Init
    session.update(
      container.properties({ ...properties, maxfileamount: undefined, singlefilemode: false }),
    );
    component.detectChanges();
    const hints = component.nativeElement.querySelectorAll('mat-hint');

    // Verify
    expect(hints.length).toBe(2);
    expect(hints[0].innerHTML).toBe(component.componentInstance.bqFileUpload.allowedExtensionsDescription);
    expect(hints[1].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileSizeDescription);
  });

  it('should display a file amount hint when the old single file mode option is used', () => {
    // Init
    session.update(
      container.properties({ ...properties, maxfileamount: undefined, singlefilemode: true }),
    );
    const hints = component.nativeElement.querySelectorAll('mat-hint');

    // Verify
    expect(hints.length).toBe(3);
    expect(hints[0].innerHTML).toBe(component.componentInstance.bqFileUpload.allowedExtensionsDescription);
    expect(hints[1].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileSizeDescription);
    expect(hints[2].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileAmountDescription);
  });

  it('should display an error message when file type is incorrect', () => {
    // Sut
    fileSelectDirective.uploader!.onWhenAddingFileFailed(new FileLikeObject({} as File), { name: 'fileType' }, {});
    component.detectChanges();
    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe(component.componentInstance.bqFileUpload.extensionInvalidValidationMessage);
  });

  it('should display an error message when file size is incorrect', () => {
    // Sut
    fileSelectDirective.uploader!.onWhenAddingFileFailed(new FileLikeObject({} as File), { name: 'fileSize' }, {});
    component.detectChanges();
    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe(component.componentInstance.bqFileUpload.fileTooLargeValidationMessage);
  });

  it('should display an error message when maximum uploaded files are exceeded', () => {
    // Sut
    component.componentInstance.ngFileUploader.onWhenMaxFilesExceeded();
    component.detectChanges();
    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe(component.componentInstance.bqFileUpload.maxFileAmountValidationMessage);
  });

  it('should display an error message even with a unknown error', () => {
    // Sut
    fileSelectDirective.uploader!.onWhenAddingFileFailed(new FileLikeObject({} as File), { name: 'unknown_error' }, {});
    component.detectChanges();
    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe('File could not be uploaded');
  });

  it('should apply the upload details when upload starts', () => {
    const details1: UploadDetails = {
      url: '/blueriq/upload/1',
      parts: [{ name: 'pageEvent', body: '1' }],
      headers: [{ name: 'accept', value: '1' }],
    };
    const details2: UploadDetails = {
      url: '/blueriq/upload/2',
      parts: [{ name: 'pageEvent', body: '2' }],
      headers: [{ name: 'accept', value: '2' }],
    };
    spyOn(FileUpload.prototype, 'getUploadDetails').and.returnValues(details1, details2);

    // Apply options for the first time
    fileSelectDirective.uploader!.onBuildItemForm(createFile(), null);

    // Verify the initial options
    const options = fileSelectDirective.uploader!.options;
    expect(options.filters!.length).toBe(3);
    expect(options.url).toEqual('/blueriq/upload/1');
    expect(options.additionalParameter).toEqual({ 'pageEvent': '1' });
    expect(options.headers).toEqual([{ name: 'accept', value: '1' }]);

    // Reconfigure options
    fileSelectDirective.uploader!.onBuildItemForm(createFile(), null);

    // Verify the updated options
    const newOptions = fileSelectDirective.uploader!.options;
    expect(newOptions.filters!.length).toBe(3, 'Reapplying options should not extend the number of filters');
    expect(newOptions.url).toEqual('/blueriq/upload/2');
    expect(newOptions.additionalParameter).toEqual({ 'pageEvent': '2' });
    expect(newOptions.headers).toEqual([{ name: 'accept', value: '2' }]);
  });

  it('should relay the upload response when upload is complete', () => {
    // init
    spyOn(FileUpload.prototype, 'handleFileUploadCompleted');
    spyOn(FileUploader.prototype, 'clearQueue');

    // Sut
    fileSelectDirective.uploader!.onCompleteItem(createFile(), 'some_response', 200, {
      'content-type': 'application/json',
    });
    component.detectChanges();

    // Verify
    expect(component.componentInstance.bqFileUpload.handleFileUploadCompleted).toHaveBeenCalledWith({
      body: 'some_response',
      status: 200,
      headers: [{ name: 'content-type', value: 'application/json' }],
    });
    expect(fileSelectDirective.uploader!.clearQueue).toHaveBeenCalled();
    expect(component.componentInstance.ngFileUploadErrorMessage).toBe('', 'Clear the client error message when a file passes');
    expect(component.componentInstance.isBusy).toBe(false, 'Upload is complete, no need to show the progress bar');
  });

  it('should override the "UploadAll" on FileUploader ', () => {
    // Init
    spyOn(CustomFileUploader.prototype, 'uploadAll').and.callThrough();
    session.update(
      container.properties({ ...properties, 'singlefilemode': false }),
    );

    // Sut
    fileSelectDirective.uploader!.uploadAll();

    // Verify
    expect(CustomFileUploader.prototype.uploadAll).toHaveBeenCalled();
  });

  it('should use the bq-heading to display header', () => {
    // Verify
    expect(component.nativeElement.querySelector('bq-heading')).toBeTruthy();
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should use apply the accepts attribute on the file input', () => {
    const inputElement = component.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    // Verify
    expect(inputElement.accept).toEqual('.txt,.doc');
  });

  it('should display the required field messages', () => {
    const requiredField = container.getChildren().filter(child => child.toJson().name === 'required')[0] as FieldTemplate;
    session.update(
      requiredField.error('This field is required'),
    );

    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe('This field is required');
  });

  function createFile(): FileItem {
    const file = new File([], 'file.txt', { type: 'text/plain', lastModified: new Date().getTime() });
    return new FileItem(fileSelectDirective.uploader!, file, { url: 'http://example.com' });
  }

});
