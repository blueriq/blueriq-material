import { Domain, Field } from '@blueriq/core';
import { instance, mock, when } from 'ts-mockito';
import { TableReadonlyComponent } from './table.readonly.component';

describe('TableComponent', () => {

  it('should return domain display value', () => {
    // Setup mock
    const field: Field<String> = mock(Field);
    when(field.getValue()).thenReturn('f');
    const fieldInstance: Field = instance(field) as Field;
    fieldInstance.hasDomain = true;
    fieldInstance.domain = createDomain();

    // SUT
    const component = new TableReadonlyComponent(fieldInstance);

    // Verify
    expect( component.getDisplayValue() ).toBe( 'Female' );
  });

  it('should return displayValue', () => {
    // Setup mock
    const fieldMock: Field<String> = mock(Field);
    when(fieldMock.getValue()).thenReturn('Female');
    const fieldInstance: Field = instance(fieldMock) as Field;
    fieldInstance.hasDomain = false;

    // SUT
    const component = new TableReadonlyComponent(fieldInstance);

    // Verify
    expect( component.getDisplayValue() ).toBe( 'Female' );
  });

  function createDomain() {
    return new Domain([{
        value: 'f',
        displayValue: 'Female'
      },
        {
          value: 'm',
          displayValue: 'Male'
        }]
    );
  }
});
