import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { DateOperator } from '@blueriq/angular/lists';
import { LocalizationTemplate } from '@blueriq/core/testing';
import { FilterModule } from '../filter.module';
import { FilterCandidate } from '../types';

import { DateFilterComponent } from './date-filter.component';

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async() => {
    const session = { localization: LocalizationTemplate.create().build() } as BlueriqSession;
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FilterModule,
      ],
      providers: [
        { provide: BlueriqSession, useValue: session },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateFilterComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.candidate = new FilterCandidate();
    fixture.detectChanges();
  });

  it('new date filter default shows on and unknown', () => {
    const operation = fixture.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(operation).toBe('On');
    const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(checkbox).toBe('true');
  });

  it('select date filter after', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const selectOptions = getMatOptionsFromOverlay();
    expect(selectOptions).toBeTruthy();
    selectOptions[2].click();
    fixture.detectChanges();

    // Verify
    expect(component.operator).toBe(DateOperator.After);
  });

  function getMatOptionsFromOverlay(): HTMLElement[] {
    const _containerElement = TestBed.inject(OverlayContainer).getContainerElement();
    return Array.from(_containerElement.querySelectorAll('mat-option'));
  }
});
