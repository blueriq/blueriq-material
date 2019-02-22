import { ValueTransformer, ValueTransformerContext } from '@blueriq/angular/forms';
import { DisplayValue, DomainValue, TechnicalValue } from '@blueriq/core';

export class DomainValueTransformer implements ValueTransformer<TechnicalValue, DomainValue | DisplayValue> {
  toControl(value: TechnicalValue | null, context: ValueTransformerContext): DomainValue | DisplayValue | null {
    if (value === null) {
      return null;
    }

    const displayValue = context.field.domain.getDisplayValue(value);

    return displayValue === undefined ? null : displayValue;
  }

  toField(value: DomainValue | DisplayValue | null, context: ValueTransformerContext): TechnicalValue | null {
    if (value === null) {
      return null;
    }

    const domainValue = typeof value === 'string' ? context.field.domain.getValue(value) : value.value;

    return domainValue === undefined ? null : domainValue;
  }
}
