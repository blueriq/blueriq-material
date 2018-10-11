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
        FormControlModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.boolean();
    field.styles(BqPresentationStyles.TOGGLE);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);
  });

  it('should be changed', () => {
    session.update(
      field.value('true')
    );
    let inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeTruthy();

    session.update(
      field.value('false')
    );
    inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeFalsy();
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.TOGGLE, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);

    const inputField = component.nativeElement.querySelector('.mat-disabled');
    expect(inputField).toBeTruthy();
  });

});
