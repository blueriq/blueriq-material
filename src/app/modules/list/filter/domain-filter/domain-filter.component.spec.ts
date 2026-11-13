import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomainPredicate } from '@blueriq/angular/lists';
import { FieldTemplate } from '@blueriq/core/testing';
import { FilterCandidate } from '../types';

import { DomainFilterComponent } from './domain-filter.component';

describe('DomainFilterComponent', () => {
  let component: DomainFilterComponent;
  let fixture: ComponentFixture<DomainFilterComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DomainFilterComponent);
    component = fixture.componentInstance;
    // there is no DomainTemplate yet so we create a Domain via a FieldTemplate
    fixture.componentRef.setInput('domain', FieldTemplate.text().domain({ one: 'een', two: 'twee', three: 'drie' }).build().domain);
    fixture.componentRef.setInput('candidate', new FilterCandidate());
    fixture.detectChanges();
  });

  it('domain filter with options', () => {
    const candidate = component.candidate();
    // there are two mat-selects, the first is for operator, second is domain values, which is the one we need
    const triggers = fixture.debugElement.queryAll(By.css('.mat-mdc-select-trigger'));
    triggers[1].nativeElement.click();
    fixture.detectChanges();

    const selectOptions = getMatOptionsFromOverlay();
    expect(selectOptions[0].textContent.trim()).toBe('een');
    expect(selectOptions[1].textContent.trim()).toBe('twee');
    expect(selectOptions[2].textContent.trim()).toBe('drie');
    selectOptions[2].click();
    fixture.detectChanges();

    // Verify
    expect((candidate.predicate as DomainPredicate).values).toEqual(['three']);
  });

  function getMatOptionsFromOverlay(): HTMLElement[] {
    return Array.from(document.querySelectorAll('mat-option'));
  }
});
