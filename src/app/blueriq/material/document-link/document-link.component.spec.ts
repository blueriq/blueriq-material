import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, LinkTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../material/material.module';
import { PresentationStyles } from '../presentationstyles/presentationstyles';
import { DocumentLinkComponent } from './document-link.component';
import { DocumentLinkService } from './document-link.service';

describe('DocumentLinkComponent', () => {

  const LINK_TEXT = 'clickme';
  const DOCUMENT_NAME = 'downloadme';

  let container: ContainerTemplate;
  let component: ComponentFixture<DocumentLinkComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentLinkComponent],
      providers: [
        BlueriqComponents.register([DocumentLinkComponent]),
        DocumentLinkService
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
        'page-name': ''
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
    expect(element.getAttribute('href')).not.toBeFalsy();
    expect(element.innerHTML).toBe(LINK_TEXT);
  });

  it('should contain the correct data when presentation style "button" is set', () => {
    session.update(
      container.styles(PresentationStyles.BUTTON)
    );
    const element = component.nativeElement.querySelector('a');
    expect(element.getAttribute('class')).toBe('mat-raised-button');
    expect(element.getAttribute('href')).not.toBeFalsy();
    expect(element.querySelector('span').innerHTML).toBe(LINK_TEXT);
  });

});
