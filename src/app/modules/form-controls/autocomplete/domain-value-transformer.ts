import { ValueTransformer, ValueTransformerContext } from '@blueriq/angular/forms';
import { DisplayValue, DomainValue, TechnicalValue } from '@blueriq/core';

export class DomainValueTransformer implements ValueTransformer<TechnicalValue, DomainValue | DisplayValue> {
  toControl(value: TechnicalValue | null, context: ValueTransformerContext): DomainValue | DisplayValue | null {
    if (value === null) {
      return null;
    } else {
      const domainDisplayValue = value === undefined || null ? undefined : context.field.domain.getDisplayValue(value);

      return domainDisplayValue === undefined ? null : domainDisplayValue;
    }
  }

  toField(value: DomainValue | DisplayValue | null, context: ValueTransformerContext): TechnicalValue | null {
    if (value === null) {
      return null;
    } else {
      const domainValue = typeof value === 'string' ? context.field.domain.getValue(value) : value.value;

      return domainValue === undefined ? null : domainValue;
    }
  }
}
