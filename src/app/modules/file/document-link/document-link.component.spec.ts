import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { DocumentLink } from '@blueriq/angular/files';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, LinkTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';
import { PresentationStylesNew } from '../../PresentationStylesNew';
import { FileDownloadService } from '../file-download/file-download.service';
import { DocumentLinkComponent } from './document-link.component';

describe('DocumentLinkComponent', () => {

  const LINK_TEXT = 'clickme';
  const DOCUMENT_NAME = 'downloadme';

  let container: ContainerTemplate;
  let component: ComponentFixture<DocumentLinkComponent>;
  let session: BlueriqTestSession;
  let mockFileDownloadService: FileDownloadService;

  beforeEach(async(() => {
    mockFileDownloadService = jasmine.createSpyObj(['download']);
    TestBed.configureTestingModule({
      declarations: [DocumentLinkComponent],
      providers: [
        BlueriqComponents.register([DocumentLinkComponent]),
        { provide: FileDownloadService, useValue: mockFileDownloadService }
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create('DocumentLink');
    container.children(
      LinkTemplate.create().text(LINK_TEXT).parameters({
        'document-name': DOCUMENT_NAME,
        'document-type': 'pdf',
        'page-name': '',
        'optional-parameters': null
      })
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(DocumentLinkComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the correct data', () => {
    const element = component.nativeElement.querySelector('a');
    expect(element.getAttribute('class')).toBe('plain-link');
    expect(element.innerHTML).toBe(LINK_TEXT);
  });

  it('should contain the correct data when presentation style "button" is set', () => {
    session.update(
      container.styles(PresentationStylesNew.BUTTON)
    );
    const element = component.nativeElement.querySelector('a');
    expect(element.getAttribute('class')).toBe('mat-raised-button');
    expect(element.querySelector('span').innerHTML).toBe(LINK_TEXT);
  });

  it('should contain the correct class when presentation styles "button" and "primary" are set', () => {
    session.update(
      container.styles(PresentationStylesNew.BUTTON, PresentationStylesNew.PRIMARY)
    );
    const element = component.nativeElement.querySelector('a');
    expect(element.getAttribute('class')).toBe('mat-raised-button mat-primary');
    expect(element.querySelector('span').innerHTML).toBe(LINK_TEXT);
  });

  it('should contain the correct class when presentation styles "button" and "accent" are set', () => {
    session.update(
      container.styles(PresentationStylesNew.BUTTON, PresentationStylesNew.ACCENT)
    );
    const element = component.nativeElement.querySelector('a');
    expect(element.getAttribute('class')).toBe('mat-raised-button mat-accent');
    expect(element.querySelector('span').innerHTML).toBe(LINK_TEXT);
  });

  it('should change the href when the download handler is called', () => {
    const element = component.nativeElement.querySelector('a');
    element.click();
    expect(mockFileDownloadService.download).toHaveBeenCalledTimes(1);
  });

});
