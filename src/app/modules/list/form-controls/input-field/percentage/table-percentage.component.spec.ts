import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltip } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../../../../BqContentStyles';
import { ListComponent } from '../../../list.component';
import { ListModule } from '../../../list.module';
import { TableInputFieldComponent } from '../table-input-field.component';
import { TablePercentageFieldComponent } from './table-percentage.component';

describe('TablePercentageFieldComponent', () => {

  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fieldPercentage = FieldTemplate.percentage()
      .error('Invalid value').warning('Incorrect value');

    tableTemplate = ContainerTemplate.create()
      .contentStyle(BqContentStyles.TABLE)
      .children(
        // ---------- Row #1 ----------
        ContainerTemplate
          .create('row')
          .contentStyle('tablerow')
          .children(
            fieldPercentage,
          ),
        // ---------- End ----------
      );
    const list = ContainerTemplate.create().children(tableTemplate);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should extend from TableInputFieldComponent', () => {
    expect((TablePercentageFieldComponent.prototype instanceof TableInputFieldComponent)).toBeTruthy();
  });

  it('should contain error and messages within a tooltip', () => {
    const matFormField = component.debugElement.query(By.css('bq-table-percentage-field mat-form-field'));
    const tooltip = matFormField.injector.get(MatTooltip);
    expect(tooltip.message).toContain('Invalid value');
    expect(tooltip.message).toContain('Incorrect value');
  });

  it('should not contain certain elements within a table view', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-percentage-field');
    expect(tableSelect.querySelector('mat-label')).toBeTruthy('should be visible for placeholder to work');
    expect(tableSelect.querySelector('mat-hint')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-error')).toBeFalsy('should not be visible within a table view');
  });

});


