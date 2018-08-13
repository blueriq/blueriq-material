import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUpload } from '@blueriq/angular/files';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';
import { FileLikeObject } from 'ng2-file-upload/file-upload/file-like-object.class';
import { FileModule } from '../file.modules';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<FileUploadComponent>;
  let session: BlueriqTestSession;

  let directiveElement: DebugElement;
  let fileSelectDirective: FileSelectDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        FileModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create().contentStyle('fileupload')
    .properties({
      'allowedextensions': 'txt|doc',
      'maxfilesize': '1337',
      'extensiondescription': 'Allowed file extensions are: {0}',
      'filesizedescription': 'Maximum file size is: {0}',
      'singlefilemode': true,
      'extensionvalidationmessage': 'File type not allowed',
      'filesizevalidationmessage': 'File is too large',
      'singleuploadlabel': 'Add file...',
      'multiuploadlabel': 'Add files...'
    }).children(
      ButtonTemplate.create('FileUploaded'),
      ButtonTemplate.create('Unauthorized')
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FileUploadComponent);

    directiveElement = component.debugElement.query(By.directive(FileSelectDirective));
    fileSelectDirective = directiveElement.injector.get(FileSelectDirective) as FileSelectDirective;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(fileSelectDirective).toBeDefined();
  });

  it('handles change event', () => {
    spyOn(fileSelectDirective.uploader, 'addToQueue');
    fileSelectDirective.onChange();
    expect(fileSelectDirective.uploader.addToQueue).toHaveBeenCalled();
  });

  it('should show progress bar when needed', () => {
    expect(component.componentInstance.isBusy).toBe(false);
    let progressBar = component.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeFalsy();

    // Sut
    fileSelectDirective.uploader.onAfterAddingFile(createFile());
    fileSelectDirective.uploader.progress = 33;
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
    expect(hints.length).toBe(2);
    expect(hints[0].innerHTML).toBe(component.componentInstance.fileUpload.allowedExtensionsDescription);
    expect(hints[1].innerHTML).toBe(component.componentInstance.fileUpload.maxFileSizeDescription);
  });

  it('should display an error message when file type is incorrect', () => {
    // Sut
    component.componentInstance.uploader.onWhenAddingFileFailed(new FileLikeObject({}), { name: 'fileType' }, {});
    component.detectChanges();
    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe(component.componentInstance.fileUpload.extensionInvalidValidationMessage);
  });

  it('should display an error message when file size is incorrect', () => {
    // Sut
    fileSelectDirective.uploader.onWhenAddingFileFailed(new FileLikeObject({}), { name: 'fileSize' }, {});
    component.detectChanges();
    const errors = component.nativeElement.querySelectorAll('mat-error');

    // Verify
    expect(errors.length).toBe(1);
    expect(errors[0].innerHTML).toBe(component.componentInstance.fileUpload.fileTooLargeValidationMessage);
  });

  it('should call runtime when upload is complete', () => {
    // init
    spyOn(FileUpload.prototype, 'handleFileUploadCompleted');
    spyOn(FileUploader.prototype, 'clearQueue');

    // Sut
    fileSelectDirective.uploader.onCompleteItem(createFile(), 'some_response', 200, {});
    component.detectChanges();

    // Verify
    expect(component.componentInstance.fileUpload.handleFileUploadCompleted).toHaveBeenCalledWith('some_response');
    expect(fileSelectDirective.uploader.clearQueue).toHaveBeenCalled();
    expect(component.componentInstance.errorMessage).toBe('', 'Clear the error message when a file passes');
    expect(component.componentInstance.isBusy).toBe(false, 'Upload is compleet, no need to show the progress bar');
  });

  function createFile(): FileItem {
    const file = new File([], 'file.txt', { type: 'text/plain', lastModified: new Date().getTime() });
    return new FileItem(fileSelectDirective.uploader, file, {});
  }

});
