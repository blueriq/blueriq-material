import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../../../BqContentStyles';
import { SelectComponent } from '../../../form-controls/select/select.component';
import { ListComponent } from '../../list.component';
import { ListModule } from '../../list.module';
import { TableSelectComponent } from './table-select.component';

describe('TableSelectComponent', () => {

  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule,
      ],
    });
  }));

  beforeEach(() => {
    const tableSelect = FieldTemplate.text('colour')
    .domain({
      'blue': 'Blue',
      'pink': 'Pink',
      'white': 'White',
    })
    .error('Invalid color').warning('Incorrect color');

    tableTemplate = ContainerTemplate.create()
    .contentStyle(BqContentStyles.TABLE)
    .children(
      // ---------- Row #1 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        tableSelect,
      ),
      // ---------- End ----------
    );
    const list = ContainerTemplate.create().children(tableTemplate);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should extend from SelectComponent', () => {
    expect((TableSelectComponent.prototype instanceof SelectComponent)).toBeTruthy();
  });

  it('should contain error and messages within a tooltip', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-select');
    const messages = tableSelect.querySelector('mat-form-field').getAttribute('ng-reflect-message');
    expect(messages).toContain('Invalid color');
    expect(messages).toContain('Incorrect color');
  });

  it('should not contain certain elements within a table view', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-select');
    expect(tableSelect.querySelector('mat-label')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-hint')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-error')).toBeFalsy('should not be visible within a table view');
  });

});


