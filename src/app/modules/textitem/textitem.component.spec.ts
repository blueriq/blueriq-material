import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { TextItemModule } from '@blueriq/angular/textitems';
import { StaticNodeTemplate, StyleNodeTemplate, TextItemNodeTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { TextItemComponent } from './textitem.component';
import { TextItemModule as BlueriqTextItemModule } from './textitem.module';

describe('TextItemComponent', () => {
  let textItem: TextItemTemplate;
  let component: ComponentFixture<TextItemComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        TextItemModule,
        BlueriqTextItemModule
      ]
    });
  }));

  beforeEach(() => {
    textItem = TextItemTemplate.create();
    session = BlueriqSessionTemplate.create().build(textItem);
    component = session.get(TextItemComponent);
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
      textItem.styles(BqPresentationStyles.DANGER)
    );

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconDangerClass = iconGutter.nativeElement.querySelector('mat-icon').innerHTML;
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Danger');
    expect(iconGutter).toBeTruthy();
    expect(iconDangerClass).toBe('error');
  });

  it('should be composed as warning', () => {
    session.update(textItem.styles(BqPresentationStyles.WARNING));

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconWarningClass = iconGutter.nativeElement.querySelector('mat-icon').innerHTML;
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Warning');
    expect(iconGutter).toBeTruthy();
    expect(iconWarningClass).toBe('warning');
  });

  it('should be composed as success', () => {
    session.update(textItem.styles(BqPresentationStyles.SUCCESS));
    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconSuccessClass = iconGutter.nativeElement.querySelector('mat-icon').innerHTML;
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Success');
    expect(iconGutter).toBeTruthy();
    expect(iconSuccessClass).toBe('check_circle');
  });

  it('should be composed as info', () => {
    session.update(textItem.styles(BqPresentationStyles.INFO));

    const iconGutter = component.debugElement.query(By.css('div[class=gutter]'));
    const iconInfoClass = iconGutter.nativeElement.querySelector('mat-icon').innerHTML;
    const classes: string = component.nativeElement.querySelector('div').getAttribute('class');
    expect(classes).toBe('text-item Info');
    expect(iconGutter).toBeTruthy();
    expect(iconInfoClass).toBe('info');
  });

});
