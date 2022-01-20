import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, LinkTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FileDownloadService } from '../file-download/file-download.service';
import { FileModule } from '../file.modules';
import { DocumentLinkComponent } from './document-link.component';

describe('DocumentLinkComponent DocumentLink', () => {

  const LINK_TEXT = 'clickme';
  const DOCUMENT_NAME = 'downloadme';

  let container: ContainerTemplate;
  let component: ComponentFixture<DocumentLinkComponent>;
  let session: BlueriqTestSession;
  let mockFileDownloadService: FileDownloadService;

  beforeEach(async() => {
    mockFileDownloadService = jasmine.createSpyObj(['download']);
    await TestBed.configureTestingModule({
      providers: [
        { provide: FileDownloadService, useValue: mockFileDownloadService },
      ],
      imports: [
        FileModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    container = ContainerTemplate.create('DocumentLink');
    container.children(
      LinkTemplate.create().text(LINK_TEXT).document(DOCUMENT_NAME, 'pdf'),
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(DocumentLinkComponent);
  });

  it('should contain the correct data', () => {
    const element = component.nativeElement.querySelector('button');
    expect(element.getAttribute('class')).toContain('plain-link');
    expect(element.innerHTML.trim()).toContain(LINK_TEXT);
  });

  it('should contain the correct data when presentation style "Button" is set', () => {
    session.update(
      container.styles(BqPresentationStyles.BUTTON),
    );
    const element = component.nativeElement.querySelector('button');
    expect(element.getAttribute('class')).toContain('mat-raised-button');
    expect(element.querySelector('span').innerHTML.trim()).toContain(LINK_TEXT);
  });

  it('should contain the correct class when presentation styles "Button" and "primary" are set', () => {
    session.update(
      container.styles(BqPresentationStyles.BUTTON, BqPresentationStyles.PRIMARY),
    );
    const element = component.nativeElement.querySelector('button');
    expect(element.getAttribute('class')).toContain('mat-raised-button');
    expect(element.getAttribute('class')).toContain('mat-primary');
    expect(element.querySelector('span').innerHTML.trim()).toContain(LINK_TEXT);
  });

  it('should contain the correct class when presentation styles "Button" and "tertiary" are set', () => {
    session.update(
      container.styles(BqPresentationStyles.BUTTON, BqPresentationStyles.TERTIARY),
    );
    const element = component.nativeElement.querySelector('button');
    expect(element.getAttribute('class')).toContain('mat-raised-button');
    expect(element.getAttribute('class')).toContain('mat-accent');
    expect(element.querySelector('span').innerHTML.trim()).toContain(LINK_TEXT);
  });

  it('should change the href when the download handler is called', () => {
    const element = component.nativeElement.querySelector('button');
    element.click();
    expect(mockFileDownloadService.download).toHaveBeenCalledTimes(1);
  });
});
