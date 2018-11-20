import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { FilterOption, FilterValue } from '@blueriq/angular/lists';
import { BlueriqTestingModule } from '@blueriq/angular/testing';
import { LocalizationTemplate } from '@blueriq/core/testing';
import * as moment from 'moment';
import { MomentTransformer } from '../../form-controls/date/moment-transformer';
import { TableFilterValueComponent } from '../filter/table.filter-value.component';
import { ListModule } from '../list.module';

describe('TableFilterValueComponent', () => {

  let tableFilterValueComponent;
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

  it('should render a mat-select when filtering on domain', () => {
    // setup
    switchSpecifiedElementByType('domain', 'kip,hond');

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    const matSelect = specifiedElement.querySelector('mat-select');
    expect(matSelect).toBeTruthy();
  });

  it('should render a mat-checkbox when filtering on boolean', () => {
    // setup
    switchSpecifiedElementByType('boolean', true);

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    const matCheckbox = specifiedElement.querySelector('mat-checkbox');
    expect(matCheckbox.getAttribute('ng-reflect-checked')).toBe('true');
    expect(matCheckbox).toBeTruthy();
  });

  it('should render a owl-date when filtering on date', () => {
    // setup
    switchSpecifiedElementByType('date', moment('2015-07-18', 'YYYY-MM-DD'));

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    expect(specifiedElement.querySelector('owl-date-time')).toBeTruthy();
    expect(specifiedElement.querySelector('input')
    .getAttribute('ng-reflect-value'))
    .toBe('18-07-2015', 'The format should be dd-mm-yyyy (see mock)');
  });

  it('should render a owl-date when filtering on datetime', () => {
    // setup
    switchSpecifiedElementByType('datetime', moment('24-09-2013 14:36:45', 'DD-MM-YYYY HH:mm:ss'));

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    expect(specifiedElement.querySelector('owl-date-time')).toBeTruthy();
    expect(specifiedElement.querySelector('input')
    .getAttribute('ng-reflect-value'))
    .toBe('24-09-2013 14:36:45', 'The format should be dd-mm-yyyy hh:mm:ss (see mock)');
  });

  it('should render a inputfield by default', () => {
    // setup
    switchSpecifiedElementByType('other', 'some value');

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    const matInput = specifiedElement.querySelector('input');
    expect(matInput).toBeTruthy();
    expect(matInput.value).toBe('some value');
  });

  it('FilterValue operations', () => {
    // setup
    const filterOption = new FilterOption();
    filterOption.type = 'integer';
    filterOption.operations = ['eq', 'lte', 'gte'];
    filterOption.index = 0;
    tableFilterValueComponent.filterOptions = [filterOption];
    tableFilterValueComponent.filterValue = new FilterValue();
    // nothing selected
    expect(tableFilterValueComponent.filterValue.operation).toBeFalsy();
    expect(tableFilterValueComponent.filterValue.value).toBeFalsy();
    expect(tableFilterValueComponent.filterValue.isValid()).toBeFalsy();

    // SUT & verify: empty operations if nothing is selected
    expect(tableFilterValueComponent.getOperations()).toEqual([]);

    // select option
    tableFilterValueComponent.onColumn(filterOption);
    // retrieve operations, the first operation is automatically set as selected operation
    tableFilterValueComponent.getOperations();
    // set value
    tableFilterValueComponent.onValue('filter');

    // verify
    expect(tableFilterValueComponent.filterValue.operation).toEqual(filterOption.operations[0]);
    // select other operation
    tableFilterValueComponent.onOperation(filterOption.operations[1]);
    // verify #2
    expect(tableFilterValueComponent.filterValue.operation).toEqual(filterOption.operations[1]);
    expect(tableFilterValueComponent.filterValue.selectedOption).toEqual(filterOption);
    expect(tableFilterValueComponent.filterValue.value).toEqual('filter');
    expect(tableFilterValueComponent.filterValue.showAll).toBeFalsy();
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

  function switchSpecifiedElementByType(type, value) {
    tableFilterValueComponent.filterValue = new FilterValue();
    tableFilterValueComponent.filterValue.selectedOption = new FilterOption();
    tableFilterValueComponent.filterValue.selectedOption.type = type;
    tableFilterValueComponent.onValue(value);
    fixture.detectChanges();
  }
});

