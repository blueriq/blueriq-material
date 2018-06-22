import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { TextItemModule } from '@blueriq/angular/textitems';
import { StaticNodeTemplate, StyleNodeTemplate, TextItemNodeTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../material.module';
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

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const textItemText: string = component.nativeElement.querySelector('div').textContent.trim();
    expect(textItemText).toBe('Lorem ipsum');
    expect(iconGutter).toBeFalsy();
  });

  it('should display the text with inline style', () => {
    const staticNode: TextItemNodeTemplate = StaticNodeTemplate.create('Lorem ipsum');
    const styleNode: TextItemNodeTemplate = StyleNodeTemplate.create('warning').nodes(staticNode);

    session.update(textItem.nodes(styleNode));

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconWarningClass = component.debugElement.query(By.css('div[class=icon-warning]'));
    const textItemText: string = component.debugElement.query(By.css('span[class=warning]'))
      .nativeElement
      .textContent
      .trim();
    expect(textItemText).toBe('Lorem ipsum');
    expect(iconGutter).toBeFalsy();
    expect(iconWarningClass).toBeFalsy();
  });

  it('should be composed as basic', () => {
    session.update(textItem.styles());

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item');
    expect(iconGutter).toBeFalsy();
  });

  it('should be composed as danger', () => {
    session.update(
      textItem.styles(PresentationStyles.DANGER)
    );

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconDangerClass = component.debugElement.query(By.css('.icon-danger'));
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Danger');
    expect(iconGutter).toBeTruthy();
    expect(iconDangerClass).toBeTruthy();
  });

  it('should be composed as warning', () => {
    session.update(textItem.styles(PresentationStyles.WARNING));

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconWarningClass = component.debugElement.query(By.css('.icon-warning'));
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Warning');
    expect(iconGutter).toBeTruthy();
    expect(iconWarningClass).toBeTruthy();
  });

  it('should be composed as success', () => {
    session.update(textItem.styles(PresentationStyles.SUCCESS));

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconSuccessClass = component.debugElement.query(By.css('.icon-success'));
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Success');
    expect(iconGutter).toBeTruthy();
    expect(iconSuccessClass).toBeTruthy();
  });

  it('should be composed as info', () => {
    session.update(textItem.styles(PresentationStyles.INFO));

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconInfoClass = component.debugElement.query(By.css('.icon-info'));
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Info');
    expect(iconGutter).toBeTruthy();
    expect(iconInfoClass).toBeTruthy();
  });

});
