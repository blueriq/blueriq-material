import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { TextItemTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../material/material.module';
import { PresentationStyles } from '../presentationstyles/presentationstyles';
import { TextItemComponent } from './textitem.component';

describe('TextItemComponent', () => {
  let textItem: TextItemTemplate;
  let component: ComponentFixture<TextItemComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextItemComponent],
      providers: [BlueriqComponents.register([TextItemComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    textItem = TextItemTemplate.create();
    session = BlueriqSessionTemplate.create().build(textItem);
    component = session.get(TextItemComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text', () => {
    session.update(
      textItem.plainText('Lorem ipsum')
    );
    const textItemText: string = component.nativeElement.querySelector('div').textContent.trim();
    expect(textItemText).toBe('Lorem ipsum');
  });

  it('should be basic colored', () => {
    session.update(
      textItem.styles()
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).not.toContain('Danger');
    expect(classes).not.toContain('Warning');
    expect(classes).not.toContain('Info');
    expect(classes).not.toContain('Success');
  });

  it('should be danger colored', () => {
    session.update(
      textItem.styles(PresentationStyles.DANGER)
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('Danger');
    expect(classes).not.toContain('Warning');
    expect(classes).not.toContain('Info');
    expect(classes).not.toContain('Success');
  });

  it('should be warning colored', () => {
    session.update(
      textItem.styles(PresentationStyles.WARNING)
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('Warning');
    expect(classes).not.toContain('Danger');
    expect(classes).not.toContain('Info');
    expect(classes).not.toContain('Success');
  });

  it('should be success colored', () => {
    session.update(
      textItem.styles(PresentationStyles.SUCCESS)
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('Success');
    expect(classes).not.toContain('Danger');
    expect(classes).not.toContain('Warning');
    expect(classes).not.toContain('Info');
  });

  it('should be info colored', () => {
    session.update(
      textItem.styles(PresentationStyles.INFO)
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('Info');
    expect(classes).not.toContain('Danger');
    expect(classes).not.toContain('Warning');
    expect(classes).not.toContain('Success');
  });

});
