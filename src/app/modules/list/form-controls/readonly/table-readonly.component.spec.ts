import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../../../BqContentStyles';
import { ReadonlyComponent } from '../../../readonly/readonly.component';
import { ListComponent } from '../../list.component';
import { TableReadonlyComponent } from './table-readonly.component';
import { provideListComponents } from '../../list.providers';
import { importProvidersFrom } from '@angular/core';
import { FormattingModule } from '@blueriq/angular/formatting';

describe('TableReadonlyComponent', () => {

  let readonlyTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;
  let field: FieldTemplate;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideListComponents(), importProvidersFrom(FormattingModule.forRoot())],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.text('color').value('You can only read this').readonly(true);

    readonlyTemplate = ContainerTemplate.create()
    .contentStyle(BqContentStyles.TABLE)
    .children(
      // ---------- Row #1 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        field,
      ),
      // ---------- End ----------
    );
    const list = ContainerTemplate.create().children(readonlyTemplate);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should extend from ReadonlyComponent', () => {
    expect((TableReadonlyComponent.prototype instanceof ReadonlyComponent)).toBeTruthy();
  });

  it('should only render text', () => {
    const tableReadonly = component.nativeElement.querySelector('bq-table-readonly');
    expect(tableReadonly.innerHTML).toContain('You can only read this');
  });

  it('should have a error', () => {
    expect(component.nativeElement.querySelector('.validations')).toBeFalsy();
    component.detectChanges();
    session.update(
      field.error('error'),
    );
    expect(component.nativeElement.querySelector('.validations')).toBeTruthy();
  });

});


