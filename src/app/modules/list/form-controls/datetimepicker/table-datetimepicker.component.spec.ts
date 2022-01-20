import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../../../BqContentStyles';
import { DateTimepickerComponent } from '../../../form-controls/date/datetimepicker/datetimepicker.component';
import { MomentTransformer } from '../../../form-controls/date/moment-transformer';
import { ListComponent } from '../../list.component';
import { ListModule } from '../../list.module';
import { TableDatetimepickerComponent } from './table-datetimepicker.component';

describe('TableDatetimePickerComponent', () => {

  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [MomentTransformer, BlueriqSession],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const datetimeField = FieldTemplate.datetime()
      .error('Invalid date').warning('Incorrect date');

    tableTemplate = ContainerTemplate.create()
      .contentStyle(BqContentStyles.TABLE)
      .children(
        // ---------- Row #1 ----------
        ContainerTemplate
          .create('row')
          .contentStyle('tablerow')
          .children(
            datetimeField,
          ),
        // ---------- End ----------
      );
    const list = ContainerTemplate.create().children(tableTemplate);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should extend from DateTimepickerComponent', () => {
    expect((TableDatetimepickerComponent.prototype instanceof DateTimepickerComponent)).toBeTruthy();
  });

  it('should contain error and messages within a tooltip', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-datetimepicker');
    const messages = tableSelect.querySelector('mat-form-field').getAttribute('ng-reflect-message');
    expect(messages).toContain('Invalid date');
    expect(messages).toContain('Incorrect date');
  });

  it('should not contain certain elements within a table view', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-datetimepicker');
    expect(tableSelect.querySelector('mat-label')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-hint')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-error')).toBeFalsy('should not be visible within a table view');
  });

});


