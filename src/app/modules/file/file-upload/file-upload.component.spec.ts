import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { FileModule } from '../file.modules';
import { FileUploadComponent } from './file-upload.component';

fdescribe('FileUploadComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<FileUploadComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        FileModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create().contentStyle('fileupload');
    container.children(
      ButtonTemplate.create('FileUploaded'),
      ButtonTemplate.create('Unauthorized')
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FileUploadComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show progress bar when needed', () => {
    // isBusy
  });

  it('should display an error message when criteria are not met', () => {
    //  uploader.onWhenAddingFileFailed
  });

  it('should call runtime when upload is complete', () => {
    //  fileUpload.handleFileUploadCompleted
  });

});
