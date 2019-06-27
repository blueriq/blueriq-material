import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';
import { SlideToggleComponent } from './slide-toggle.component';

describe('SlideToggleComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<SlideToggleComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.boolean().styles(BqPresentationStyles.SWITCH).questionText('Setting1').explainText('Explain2');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);
  });

  it('should be rendered properly', () => {
    const label = component.nativeElement.querySelector('.mat-slide-toggle-label');
    expect(label.innerText.trim()).toBe('Setting1');
    const hint = component.nativeElement.querySelector('mat-hint');
    expect(hint.innerText.trim()).toBe('Explain2');
    const inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeFalsy();
  });

  it('should be changed', () => {
    session.update(
      field.value('true'),
    );
    let inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeTruthy();

    session.update(
      field.value('false'),
    );
    inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeFalsy();
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.SWITCH, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);

    const inputField = component.nativeElement.querySelector('.mat-disabled');
    expect(inputField).toBeTruthy();
  });

});
