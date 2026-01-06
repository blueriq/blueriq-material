import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltip } from '@angular/material/tooltip';
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
    const matFormField = component.debugElement.query(By.css('bq-table-select mat-form-field'));
    const tooltip = matFormField.injector.get(MatTooltip);
    expect(tooltip.message).toContain('Invalid color');
    expect(tooltip.message).toContain('Incorrect color');
  });

  it('should not contain certain elements within a table view', () => {
    const tableSelect = component.nativeElement.querySelector('bq-table-select');
    expect(tableSelect.querySelector('mat-label')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-hint')).toBeFalsy('should not be visible within a table view');
    expect(tableSelect.querySelector('mat-error')).toBeFalsy('should not be visible within a table view');
  });

});


