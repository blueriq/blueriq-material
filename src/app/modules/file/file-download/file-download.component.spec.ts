import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDownload } from '@blueriq/angular/files';
import { AuthorizedDownload } from '@blueriq/angular/src/api/file_handling';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { ButtonComponent } from '../../button/button.component';
import { FileModule } from '../file.modules';
import { FileDownloadComponent } from './file-download.component';
import { FileDownloadService } from './file-download.service';

describe('FileDownloadComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<FileDownloadComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [BlueriqTestingModule, FileModule],
    }).compileComponents();
  });

  beforeEach(async() => {
    container = ContainerTemplate.create().contentStyle('filedownload').children(
      ButtonTemplate.create('downloadButton'),
      ButtonTemplate.create('Unauthorized'),
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FileDownloadComponent);
  });

  it('should extend from button component', () => {
    expect((FileDownloadComponent.prototype instanceof ButtonComponent)).toBeTruthy();
  });

  it('should override the onClick and use the downloadService', () => {
    // Init
    const authDownload: AuthorizedDownload = { type: 'authorized', url: '/some/url' };
    spyOn(FileDownload.prototype, 'getDownloadInfo').and.callFake(() => of(authDownload));
    spyOn(FileDownloadService.prototype, 'download').and.callFake((url: string) => {
      // not interested in the actual implementation
      expect(url).toBe('/some/url');
    });
    const button = component.nativeElement.querySelector('button');
    expect(button).toBeTruthy();

    // SUT
    button.click();
    component.detectChanges();

    // Verify
    expect(FileDownloadService.prototype.download).toHaveBeenCalled();
  });

});
