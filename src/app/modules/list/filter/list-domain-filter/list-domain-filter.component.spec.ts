import { OverlayContainer } from '@angular/cdk/overlay';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomainPredicate } from '@blueriq/angular/lists';
import { FieldTemplate } from '@blueriq/core/testing';
import { TableFilterModule } from '../table.filter.module';
import { FilterCandidate } from '../types';

import { ListDomainFilterComponent } from './list-domain-filter.component';

describe('ListDomainFilterComponent', () => {
  let component: ListDomainFilterComponent;
  let fixture: ComponentFixture<ListDomainFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TableFilterModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDomainFilterComponent);
    component = fixture.componentInstance;
    // there is no DomainTemplate yet so we create a Domain via a FieldTemplate
    component.domain = FieldTemplate.text().domain({ one: 'een', two: 'twee', three: 'drie' }).build().domain;
    fixture.detectChanges();
  });

  it('domain filter with options', fakeAsync(() => {
    const candidate = component.candidate = new FilterCandidate();
    // there are two mat-selects, the first is for operator, second is domain values, which is the one we need
    const triggers = fixture.debugElement.queryAll(By.css('.mat-select-trigger'));
    triggers[1].nativeElement.click();
    fixture.detectChanges();

    const selectOptions = getMatOptionsFromOverlay();
    expect(selectOptions[0].innerText.trim()).toBe('een');
    expect(selectOptions[1].innerText.trim()).toBe('twee');
    expect(selectOptions[2].innerText.trim()).toBe('drie');
    selectOptions[2].click();

    // Verify
    expect((candidate.predicate as DomainPredicate).values).toEqual(['three']);
  }));

  function getMatOptionsFromOverlay(): HTMLElement[] {
    const _containerElement = TestBed.get(OverlayContainer).getContainerElement();
    return Array.from(_containerElement.querySelectorAll('mat-option'));
  }
});
