import { FieldTemplate } from '@blueriq/core/testing';
import { TableReadonlyComponent } from './table.readonly.component';

describe('TableComponent', () => {

  it('should return domain display value', () => {
    const field = FieldTemplate.text('')
      .value('f')
      .domain({
        'f': 'Female',
        'm': 'Male'
      }).build();

    // SUT
    const component = new TableReadonlyComponent(field);

    // Verify
    expect( component.getDisplayValue() ).toBe( 'Female' );
  });

  it('should return displayValue', () => {
    const field = FieldTemplate.text('')
      .value('Female')
      .build();

    // SUT
    const component = new TableReadonlyComponent(field);

    // Verify
    expect( component.getDisplayValue() ).toBe( 'Female' );
  });

});
