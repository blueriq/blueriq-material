import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NumericOperator } from '@blueriq/angular/lists';
import { FilterModule } from '../filter.module';
import { FilterCandidate } from '../types';

import { NumericFilterComponent } from './numeric-filter.component';

describe('NumericFilterComponent', () => {
  let component: NumericFilterComponent;
  let fixture: ComponentFixture<NumericFilterComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FilterModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NumericFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('default filter is equals and show unknown', () => {
    component.candidate = new FilterCandidate();
    fixture.detectChanges();

    const operation = fixture.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(operation).toBe('Equal to');
    const showUnknown = fixture.nativeElement.querySelector('.mat-checkbox-input');
    expect(showUnknown.checked).toBe(true);
  });

  it('select greater than or equals operator', () => {
    component.candidate = new FilterCandidate();
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const selectOptions = getMatOptionsFromOverlay();
    expect(selectOptions).toBeTruthy();
    selectOptions[2].click();
    fixture.detectChanges();

    // Verify
    expect(component.operator).toBe(NumericOperator.GreaterThanEquals);
  });

  function getMatOptionsFromOverlay(): HTMLElement[] {
    const _containerElement = TestBed.inject(OverlayContainer).getContainerElement();
    return Array.from(_containerElement.querySelectorAll('mat-option'));
  }
});
