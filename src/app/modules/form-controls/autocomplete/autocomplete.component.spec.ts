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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.text('colour').styles(BqPresentationStyles.AUTOCOMPLETE).domain({
      'r': 'Red',
      'w': 'White',
      'b': 'Blue',
      'o': 'Orange',
    });
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(AutocompleteComponent);
  });

  it('should be disabled', () => {
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(false);

    session.update(
      field.styles(BqPresentationStyles.AUTOCOMPLETE, BqPresentationStyles.DISABLED),
    );

    autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(true);
  });

  it('should be read only', () => {
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(false);

    session.update(
      field.readonly(true),
    );

    autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.properties['disabled']).toBe(true);
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it'),
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    session.update(
      field.placeholder('myPlaceholder'),
    );
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.attributes['data-placeholder']).toBe('myPlaceholder');
  });

  it('should have an error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.required(true),
      field.error('wrong IBAN'),
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should display value when fieldValue set', async() => {
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.nativeElement.value).toBe('');

    session.update(
      field.value('b'),
    );

    await component.whenStable();
    component.detectChanges();

    autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput.nativeElement.value).toBe('Blue');
  });

  it('should only have one mat-autocomplete', () => {
    const autocompleteList = component.nativeElement.querySelectorAll('mat-autocomplete') as NodeListOf<HTMLElement>;
    expect(autocompleteList.length).toBe(1);
  });

  it('should set fieldValue when option clicked', async() => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.dispatchEvent(new Event('focusin'));

    await component.whenStable();
    component.detectChanges();

    const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
    const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;
    expect(autocompleteOptions).toBeTruthy();
    // Click on the 'White' option
    autocompleteOptions[1].click();

    await component.whenStable();
    component.detectChanges();

    // Verify
    // The technical value for 'White' is 'w'
    expect(component.componentInstance.field.getValue()).toBe('w');
  });

  it('initially should contain all domain values in autocomplete', async() => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.dispatchEvent(new Event('focusin'));

    await component.whenStable();
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

  it('should contain correct options for filter input', async() => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.focus();
    autocompleteInput.nativeElement.value = 'r';
    autocompleteInput.nativeElement.dispatchEvent(new Event('input'));

    await component.whenStable();
    component.detectChanges();

    const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
    const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;

    // Verify
    expect(autocompleteOptions.length).toBe(2);
    expect(autocompleteOptions[0].textContent).toContain('Red');
    expect(autocompleteOptions[1].textContent).toContain('Orange');
  });

  it('should set fieldValue when part of domain value typed and clicked', async() => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    autocompleteInput.nativeElement.focus();
    autocompleteInput.nativeElement.value = 'bl';
    autocompleteInput.nativeElement.dispatchEvent(new Event('input'));

    await component.whenStable();
    component.detectChanges();

    const autocompleteContent = component.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
    const autocompleteOptions = autocompleteContent.querySelectorAll('.mat-option-text') as NodeListOf<HTMLElement>;
    expect(autocompleteOptions).toBeTruthy();
    // Click on the 'Blue' option
    autocompleteOptions[0].click();

    await component.whenStable();
    component.detectChanges();

    // Verify
    // The technical value for 'Blue' is 'b'
    expect(component.componentInstance.field.getValue()).toBe('b');
  });

  it('should remain the value on correct input', () => {
    let input = component.nativeElement.querySelector('.mat-input-element');
    input.setAttribute('value', 'White');

    // SUT
    input.dispatchEvent(new Event('blur'));

    // Verify
    input = component.nativeElement.querySelector('.mat-input-element');
    expect(input.value).toBe('White');
  });

  it('should clear the value on incorrect input', () => {
    let input = component.nativeElement.querySelector('.mat-input-element');
    input.setAttribute('value', 'ThisIsNotAColor');

    // SUT
    input.dispatchEvent(new Event('blur'));

    // Verify
    input = component.nativeElement.querySelector('.mat-input-element');
    expect(input.value).toBe('', 'The value should be cleared when onblur and has incorrect value');
  });

  it('should reset input value when the value is not within the domain', async() => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    // input something that is not in the domain
    autocompleteInput.nativeElement.focus();
    autocompleteInput.nativeElement.value = 'something_not_in_the_domain';
    autocompleteInput.nativeElement.dispatchEvent(new Event('input'));
    // trigger blur to check the value
    autocompleteInput.nativeElement.blur();

    await component.whenStable();
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
