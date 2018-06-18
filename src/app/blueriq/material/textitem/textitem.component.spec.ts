import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { TextItemModule } from '@blueriq/angular/textitems';
import { StaticNodeTemplate, StyleNodeTemplate, TextItemNodeTemplate, TextItemTemplate } from '@blueriq/core/testing';
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
        FormsModule,
        TextItemModule
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
    const staticNode: TextItemNodeTemplate = StaticNodeTemplate.create('Lorem ipsum');

    session.update(textItem.nodes(staticNode));

    const textItemText: string = component.nativeElement.querySelector('div').textContent.trim();
    expect(textItemText).toBe('Lorem ipsum');
  });

  it('should display the text with inline style', () => {
    const staticNode: TextItemNodeTemplate = StaticNodeTemplate.create('Lorem ipsum');
    const styleNode: TextItemNodeTemplate = StyleNodeTemplate.create('warning').nodes(staticNode);

    session.update(
      textItem.nodes(styleNode)
    );

    const textItemText: string = component.debugElement.query(By.css('span[class=warning]'))
      .nativeElement
      .textContent
      .trim();
    expect(textItemText).toBe('Lorem ipsum');
  });


  it('should be basic colored', () => {
    session.update(
      textItem.styles()
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).not.toContain('danger');
    expect(classes).not.toContain('darning');
    expect(classes).not.toContain('info');
    expect(classes).not.toContain('success');
  });

  it('should be danger colored', () => {
    session.update(
      textItem.styles(PresentationStyles.DANGER.toLowerCase())
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('danger');
    expect(classes).not.toContain('warning');
    expect(classes).not.toContain('info');
    expect(classes).not.toContain('success');
  });

  it('should be warning colored', () => {
    session.update(
      textItem.styles(PresentationStyles.WARNING.toLowerCase())
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('warning');
    expect(classes).not.toContain('danger');
    expect(classes).not.toContain('info');
    expect(classes).not.toContain('success');
  });

  it('should be success colored', () => {
    session.update(
      textItem.styles(PresentationStyles.SUCCESS.toLowerCase())
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('success');
    expect(classes).not.toContain('danger');
    expect(classes).not.toContain('warning');
    expect(classes).not.toContain('info');
  });

  it('should be info colored', () => {
    session.update(
      textItem.styles(PresentationStyles.INFO.toLowerCase())
    );

    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toContain('info');
    expect(classes).not.toContain('danger');
    expect(classes).not.toContain('warning');
    expect(classes).not.toContain('success');
  });

});
