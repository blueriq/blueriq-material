import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../../../BqContentStyles';
import { InputFieldComponent } from '../../../form-controls/input-field/input-field.component';
import { ListComponent } from '../../list.component';
import { ListModule } from '../../list.module';
import { TableInputFieldComponent } from './table-input-field.component';

describe('TableInputFieldComponent', () => {
  let tableTemplate: ContainerTemplate;
  let fieldIntegerTemplate: FieldTemplate;
  let component: ComponentFixture<ListComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule,
      ],
    });
  }));

  beforeEach(() => {
    fieldIntegerTemplate = FieldTemplate.integer().error('Invalid value').warning('Incorrect value');

    tableTemplate = ContainerTemplate.create()
    .contentStyle(BqContentStyles.TABLE)
    .children(
      // ---------- Row #1 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        fieldIntegerTemplate,
      ),
      // ---------- End ----------
    );
    const list = ContainerTemplate.create().children(tableTemplate);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should extend from InputFieldComponent', () => {
    expect((TableInputFieldComponent.prototype instanceof InputFieldComponent)).toBeTruthy();
  });

  it('should have required marker in placeholder text', () => {
    session.update(
      fieldIntegerTemplate.placeholder('myPlaceholder'),
      fieldIntegerTemplate.required(true),
    );
    expect(component.nativeElement.querySelector('input[data-placeholder]')).toBeTruthy();
    expect(component.nativeElement.querySelector('input').getAttribute('data-placeholder')).toBe('myPlaceholder *');
  });
});
