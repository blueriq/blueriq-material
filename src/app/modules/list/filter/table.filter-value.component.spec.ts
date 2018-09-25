import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { FilterOption, FilterValue } from '@blueriq/angular/lists';
import { BlueriqTestingModule } from '@blueriq/angular/testing';
import { MomentTransformer } from '../../form-controls/date/moment-transformer';
import { TableFilterValueComponent } from '../filter/table.filter-value.component';
import { ListModule } from '../list.module';

describe('TableFilterValueComponent', () => {

  let tableFilterValueComponent;
  let fixture: ComponentFixture<TableFilterValueComponent>;

  beforeEach(() => {
    // mocking the session
    spyOnProperty(BlueriqSession.prototype, 'language', 'get').and.returnValue({
      languageCode: 'nl-NL',
      patterns: {
        date: 'dd-mm-yyyy',
        datetime:
          'dd-mm-yyyy hh:mm:ss'
      }
    });

    TestBed.configureTestingModule({
      providers: [MomentTransformer, BlueriqSession],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule
      ]
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
    switchSpecifiedElementByType('date', '2012-12-12');

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    expect(specifiedElement.querySelector('owl-date-time')).toBeTruthy();
    expect(specifiedElement.querySelector('input').value).toBe('12-12-2012',
      'The format should be dd-mm-yyyy (see mock)');
  });

  it('should render a owl-date when filtering on datetime', () => {
    // setup
    switchSpecifiedElementByType('datetime', '12-12-2012 10:11:12');

    // Verify
    const specifiedElement = fixture.nativeElement.querySelector('#specifiedElement');
    expect(specifiedElement.querySelector('owl-date-time')).toBeTruthy();
    expect(specifiedElement.querySelector('input')
    .getAttribute('ng-reflect-value'))
    .toBe('12-12-2012 10:11:12', 'The format should be dd-mm-yyyy hh:mm:ss (see mock)');
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

  it('remove filter value', (done) => {
    // setup
    let receivedEvent;
    const subscription = tableFilterValueComponent.remove.subscribe((event) => {
      receivedEvent = event;
      done();
    });

    // SUT
    tableFilterValueComponent.removeFilter();

    // verify
    expect(receivedEvent).toBeTruthy();
    expect(receivedEvent).toEqual('remove me');
  });

  function switchSpecifiedElementByType(type, value) {
    tableFilterValueComponent.filterValue = new FilterValue();
    tableFilterValueComponent.filterValue.value = value;
    tableFilterValueComponent.filterValue.selectedOption = new FilterOption();
    tableFilterValueComponent.filterValue.selectedOption.type = type;
    fixture.detectChanges();
  }
});

