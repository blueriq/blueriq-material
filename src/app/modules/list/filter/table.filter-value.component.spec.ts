import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { ColumnFilter } from '@blueriq/angular/lists';
import { BlueriqTestingModule } from '@blueriq/angular/testing';
import { LocalizationTemplate } from '@blueriq/core/testing';
import * as moment from 'moment';
import { MomentTransformer } from '../../form-controls/date/moment-transformer';
import { TableFilterValueComponent } from '../filter/table.filter-value.component';
import { ListModule } from '../list.module';
import { FilterValue, Operation } from './types';

describe('TableFilterValueComponent', () => {

  let tableFilterValueComponent: TableFilterValueComponent;
  let fixture: ComponentFixture<TableFilterValueComponent>;

  beforeEach(() => {
    // mocking the session
    const localization = LocalizationTemplate.create().build();
    spyOnProperty(BlueriqSession.prototype, 'localization', 'get').and.returnValue(localization);

    TestBed.configureTestingModule({
      providers: [MomentTransformer, BlueriqSession],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule,
      ],
    });
    fixture = TestBed.createComponent(TableFilterValueComponent);
    tableFilterValueComponent = fixture.componentInstance;
  });

  it('should render a mat-select when filtering on domain', fakeAsync(() => {
    // setup
    switchSpecifiedElementByType('domain', 'kip,hond');

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    const matSelect = specifiedElement.querySelector('mat-select');
    expect(matSelect).toBeTruthy();
  }));

  it('should render a mat-checkbox when filtering on boolean', fakeAsync(() => {
    // setup
    switchSpecifiedElementByType('boolean', true);

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    const matCheckbox = specifiedElement.querySelector('mat-checkbox');
    expect(matCheckbox.getAttribute('ng-reflect-checked')).toBe('true');
    expect(matCheckbox).toBeTruthy();
  }));

  it('should render an owl-date when filtering on date', fakeAsync(() => {
    // setup
    const date = moment('2015-07-18', 'YYYY-MM-DD');
    switchSpecifiedElementByType('date', date);

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    expect(specifiedElement.querySelector('owl-date-time')).toBeTruthy();
    expect(specifiedElement.querySelector('input').value)
      .toBe('18-07-2015', 'The format should be dd-mm-yyyy');
  }));

  it('should render an owl-date when filtering on datetime', fakeAsync(() => {
    // setup
    const date = moment('24-09-2013 14:36:45', 'DD-MM-YYYY HH:mm:ss');
    switchSpecifiedElementByType('datetime', date);

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    expect(specifiedElement.querySelector('owl-date-time')).toBeTruthy();
    expect(specifiedElement.querySelector('input').value)
      .toBe('24-09-2013 14:36:45', 'The format should be dd-mm-yyyy hh:mm:ss');
  }));

  it('should render an inputfield by default', fakeAsync(() => {
    // setup
    switchSpecifiedElementByType('other', 'some value');

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    const matInput = specifiedElement.querySelector('input');
    expect(matInput).toBeTruthy();
    expect(matInput.value).toBe('some value');
  }));

  it('FilterValue operations', () => {
    // setup
    const columnFilter = { type: 'integer' } as ColumnFilter;
    tableFilterValueComponent.currentColumns = [columnFilter];
    tableFilterValueComponent.filterValue = new FilterValue();
    // nothing selected
    expect(tableFilterValueComponent.filterValue.operation).toBeFalsy();
    expect(tableFilterValueComponent.filterValue.value).toBeFalsy();
    expect(tableFilterValueComponent.filterValue.isValid()).toBeFalsy();

    // SUT & verify: empty operations if nothing is selected
    expect(tableFilterValueComponent.getOperations()).toEqual([]);

    // select option
    tableFilterValueComponent.onColumn(columnFilter);
    // retrieve operations, the first operation is automatically set as selected operation
    tableFilterValueComponent.getOperations();
    // set value
    tableFilterValueComponent.onValue('filter');

    // verify
    expect(tableFilterValueComponent.filterValue.operation).toEqual(Operation.EQ);
    // select other operation
    tableFilterValueComponent.onOperation(Operation.LTE);
    // verify #2
    expect(tableFilterValueComponent.filterValue.operation).toEqual(Operation.LTE);
    expect(tableFilterValueComponent.filterValue.selectedOption).toEqual(columnFilter);
    expect(tableFilterValueComponent.filterValue.value).toEqual('filter');
    expect(tableFilterValueComponent.filterValue.showUnknown).toBeTruthy();
    expect(tableFilterValueComponent.filterValue.isValid()).toBeTruthy();
  });

  it('remove filter value', () => {
    // setup
    let receivedEvent = false;
    const subscription = tableFilterValueComponent.remove.subscribe(() => receivedEvent = true);

    // SUT
    tableFilterValueComponent.removeFilter();

    // verify
    expect(receivedEvent).toBe(true);

    subscription.unsubscribe();
  });

  function switchSpecifiedElementByType(type: string, value: string | boolean | moment.Moment) {
    tableFilterValueComponent.filterValue = new FilterValue();
    tableFilterValueComponent.filterValue.selectedOption = { type } as ColumnFilter;
    if (moment.isMoment(value)) {
      tableFilterValueComponent.onDateValue({ value, source: {} });
    } else {
      tableFilterValueComponent.onValue(value as string);
    }
    fixture.detectChanges();
    tick();
  }
});
