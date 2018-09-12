import { FilterOption, FilterValue } from '@blueriq/angular/lists';
import { TableFilterValueComponent } from '../filter/table.filter-value.component';

fdescribe('TableFilterValueComponent', () => {
  const tableFilterValueComponent = new TableFilterValueComponent();

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

    // SUT
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
    let receivedEvent;
    const subscription = tableFilterValueComponent.remove.subscribe((event) => {
      receivedEvent = event;
    });

    // SUT
    tableFilterValueComponent.removeFilter();

    // verify
    expect(receivedEvent).toBeTruthy();
    expect(receivedEvent).toEqual('remove me');
  });
});
