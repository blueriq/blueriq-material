import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { FileModule } from '../file.modules';
import { FileDownloadComponent } from './file-download.component';
import { FileDownloadService } from './file-download.service';

describe('FileDownloadComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<FileDownloadComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule, FileModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create().contentStyle('filedownload');
    container.children(
      ButtonTemplate.create('downloadButton'),
      ButtonTemplate.create('Unauthorized')
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FileDownloadComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should override the onClick and use the downloadService', () => {
    spyOn(FileDownloadService.prototype, 'download').and.callThrough();
    const button = component.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    component.componentInstance.fileDownload.getDownloadInfo().subscribe(e => {
      expect(FileDownloadService.prototype.download).toHaveBeenCalled();
    });
  });
});
