import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../../../../BqContentStyles';
import { ListComponent } from '../../../list.component';
import { ListModule } from '../../../list.module';
import { TableInputFieldComponent } from '../table-input-field.component';
import { TableStringFieldComponent } from './table-string.component';

describe('TableStringFieldComponent', () => {

  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;

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
    const fieldString = FieldTemplate.text()
    .error('Invalid text').warning('Incorrect text');

    tableTemplate = ContainerTemplate.create()
    .contentStyle(BqContentStyles.TABLE)
    .children(
      // ---------- Row #1 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        fieldString,
      ),
      // ---------- End ----------
    );
    const list = ContainerTemplate.create().children(tableTemplate);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should extend from TableInputFieldComponent', () => {
    expect((TableStringFieldComponent.prototype instanceof TableInputFieldComponent)).toBeTruthy();
  });

  it('should contain error and messages within a tooltip', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-string-field');
    const messages = tableSelect.querySelector('mat-form-field').getAttribute('ng-reflect-message');
    expect(messages).toContain('Invalid text');
    expect(messages).toContain('Incorrect text');
  });

  it('should not contain certain elements within a table view', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-string-field');
    expect(tableSelect.querySelector('mat-label')).toBeTruthy('should be visible for placeholder to work');
    expect(tableSelect.querySelector('mat-hint')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-error')).toBeFalsy('should not be visible within a table view');
  });

});


