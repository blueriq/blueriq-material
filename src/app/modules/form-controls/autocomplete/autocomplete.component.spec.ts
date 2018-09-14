import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { AutocompleteComponent } from './autocomplete.component';
import { DomainValueTransformer } from './domain-value-transformer';

describe('AutocompleteComponent', () => {
  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      providers: [DomainValueTransformer, BlueriqComponents.register([AutocompleteComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
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
    let autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
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

    dispatchFakeEvent(autocompleteInput.nativeElement, 'focusin');

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

  it('should contain all domain values in autocomplete', () => {
    const autocompleteInput = component.debugElement.query(By.css('.mat-input-element'));
    expect(autocompleteInput).toBeTruthy();

    dispatchFakeEvent(autocompleteInput.nativeElement, 'focusin');

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

  // TODO import these functions from cdk testing
  function createFakeEvent(type: string) {
    const event = document.createEvent('Event');
    event.initEvent(type, true, true);
    return event;
  }

  function dispatchFakeEvent(node: Node | Window, type: string) {
    node.dispatchEvent(createFakeEvent(type));
  }
});
