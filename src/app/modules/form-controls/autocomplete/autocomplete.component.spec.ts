import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FormControlModule } from '../form-control.module';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule
      ]
    });
  });

  beforeEach(() => {
    field = FieldTemplate.text('colour').styles(BqPresentationStyles.AUTOCOMPLETE).domain({
      'a': 'Red',
      'b': 'White',
      'c': 'Blue',
      'd': 'Orange'
    });
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(AutocompleteComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled', () => {
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(false);

    field.styles(BqPresentationStyles.AUTOCOMPLETE, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(AutocompleteComponent);

    autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(true);
  });

  it('should be read only', () => {
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(false);

    field.readonly(true);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(AutocompleteComponent);

    autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(true);
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    session.update(
      field.placeholder('myPlaceholder')
    );
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.attributes['placeholder']).toBe('myPlaceholder');
  });

  it('should have a error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.required(true),
      field.error('wrong IBAN')
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should display value when fieldValue set', () => {
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.nativeElement.value).toBe('');

    session.update(
      field.value('c')
    );

    component.whenStable()
    .then(() => {
      component.detectChanges();
      autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
      expect(autocompleteInput.nativeElement.value).toBe('Blue');
    });
  });

  it('should only have one mat-autocomplete', () => {
    const autocompleteList = component.nativeElement.querySelectorAll('mat-autocomplete') as NodeListOf<HTMLElement>;
    expect(autocompleteList.length).toBe(1);
  });

  it('should set fieldValue when option clicked', () => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.dispatchEvent(new Event('focusin'));

    component.whenStable()
    .then(() => {
      component.detectChanges();
      const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
      const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;
      expect(autocompleteOptions).toBeTruthy();
      // Click on the 'White' option
      autocompleteOptions[1].click();
    });

    component.whenStable()
    .then(() => {
      component.detectChanges();
      // Verify
      // The technical value for 'White' is 'b'
      expect(component.componentInstance.field.getValue()).toBe('b');
    });
  });

  it('initially should contain all domain values in autocomplete', () => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.dispatchEvent(new Event('focusin'));

    component.whenStable()
    .then(() => {
      component.detectChanges();
      const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
      const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;

      // Verify
      expect(autocompleteOptions.length).toBe(4);
      expect(autocompleteOptions[0].textContent).toContain('Red');
      expect(autocompleteOptions[1].textContent).toContain('White');
      expect(autocompleteOptions[2].textContent).toContain('Blue');
      expect(autocompleteOptions[3].textContent).toContain('Orange');
    });
  });

  it('should contain correct options for filter input', () => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.focus();
    autocompleteInput.nativeElement.value = 'r';
    autocompleteInput.nativeElement.dispatchEvent(new Event('input'));

    component.whenStable()
    .then(() => {
      component.detectChanges();
      const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
      const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;

      // Verify
      expect(autocompleteOptions.length).toBe(2);
      expect(autocompleteOptions[0].textContent).toContain('Red');
      expect(autocompleteOptions[1].textContent).toContain('Orange');
    });
  });

  it('should set fieldValue when part of domain value typed and clicked', () => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.focus();
    autocompleteInput.nativeElement.value = 'bl';
    autocompleteInput.nativeElement.dispatchEvent(new Event('input'));

    component.whenStable()
    .then(() => {
      component.detectChanges();
      const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
      const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;
      expect(autocompleteOptions).toBeTruthy();
      // Click on the 'Blue' option
      autocompleteOptions[0].click();
    });

    component.whenStable()
    .then(() => {
      component.detectChanges();
      // Verify
      // The technical value for 'Blue' is 'c'
      expect(component.componentInstance.field.getValue()).toBe('c');
    });
  });

  it('should reset input value when the value is not within the domain', () => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    // input something that is not in the domain
    autocompleteInput.nativeElement.focus();
    autocompleteInput.nativeElement.value = 'something_not_in_the_domain';
    autocompleteInput.nativeElement.dispatchEvent(new Event('input'));
    // trigger blur to check the value
    autocompleteInput.nativeElement.blur();

    component.whenStable()
    .then(() => {
      component.detectChanges();
      const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
      const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;
      expect(autocompleteOptions).toBeTruthy();
      // Verify
      // all options are filtered out
      expect(autocompleteOptions.length).toEqual(0);
      // the field value is still empty
      expect(component.componentInstance.field.getValue()).toEqual('');
      // the input value is reset
      expect(autocompleteInput.nativeElement.value).toEqual('');
    });
  });
});
