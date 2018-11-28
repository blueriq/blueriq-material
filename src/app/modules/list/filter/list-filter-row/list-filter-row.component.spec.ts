import { OverlayContainer } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { ColumnFilter } from '@blueriq/angular/lists';
import { FieldTemplate, LocalizationTemplate } from '@blueriq/core/testing';
import { ListBooleanFilterComponent } from '../list-boolean-filter/list-boolean-filter.component';
import { ListDateFilterComponent } from '../list-date-filter/list-date-filter.component';
import { ListDomainFilterComponent } from '../list-domain-filter/list-domain-filter.component';
import { ListEmptyFilterComponent } from '../list-empty-filter/list-empty-filter.component';
import { ListNumericFilterComponent } from '../list-numeric-filter/list-numeric-filter.component';
import { ListTextFilterComponent } from '../list-text-filter/list-text-filter.component';
import { TableFilterModule } from '../table.filter.module';
import { FilterCandidate } from '../types';

import { ListFilterRowComponent } from './list-filter-row.component';

describe('ListFilterRowComponent', () => {
  let component: ListFilterRowComponent;
  let fixture: ComponentFixture<ListFilterRowComponent>;

  beforeEach(async(() => {
    const session = { localization: LocalizationTemplate.create().build() } as BlueriqSession;
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TableFilterModule,
      ],
      providers: [
        { provide: BlueriqSession, useValue: session },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterRowComponent);
    component = fixture.componentInstance;

    const columns: ColumnFilter[] = [
      { type: 'boolean', title: 'boolean' } as ColumnFilter,
      { type: 'date', title: 'date' } as ColumnFilter,
      { type: 'datetime', title: 'datetime' } as ColumnFilter,
      { type: 'domain', title: 'domain', domain: FieldTemplate.text().domain({}).build().domain } as ColumnFilter,
      { type: 'text', title: 'text' } as ColumnFilter,
      { type: 'number', title: 'number' } as ColumnFilter,
    ];
    component.currentColumns = columns;
    component.candidate = new FilterCandidate();

    fixture.detectChanges();
  });

  it('should create', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const selectOptions = getMatOptionsFromOverlay();
    expect(selectOptions.length).toBe(6);
    const emptyComponent = fixture.debugElement.query(By.directive(ListEmptyFilterComponent));
    expect(emptyComponent).toBeTruthy();
  });

  function selectColumn(type: string): void {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const selectOptions = getMatOptionsFromOverlay();
    const index = component.currentColumns.findIndex(column => column.type === type);
    selectOptions[index].click();
    fixture.detectChanges();
  }

  it('select boolean', () => {
    selectColumn('boolean');
    expect(fixture.debugElement.query(By.directive(ListBooleanFilterComponent))).toBeTruthy();
    expect(component.candidate.predicate!.type).toBe('boolean');
  });

  it('select date', () => {
    selectColumn('date');
    expect(fixture.debugElement.query(By.directive(ListDateFilterComponent))).toBeTruthy();
    expect(component.candidate.predicate!.type).toBe('date');
  });

  it('select datetime', () => {
    selectColumn('datetime');
    expect(fixture.debugElement.query(By.directive(ListDateFilterComponent))).toBeTruthy();
    expect(component.candidate.predicate!.type).toBe('date');
  });

  it('select domain', () => {
    selectColumn('domain');
    expect(fixture.debugElement.query(By.directive(ListDomainFilterComponent))).toBeTruthy();
    expect(component.candidate.predicate!.type).toBe('domain');
  });

  it('select number', () => {
    selectColumn('number');
    expect(fixture.debugElement.query(By.directive(ListNumericFilterComponent))).toBeTruthy();
    expect(component.candidate.predicate!.type).toBe('numeric');
  });

  it('select text', () => {
    selectColumn('text');
    expect(fixture.debugElement.query(By.directive(ListTextFilterComponent))).toBeTruthy();
    expect(component.candidate.predicate!.type).toBe('text');
  });

  function getMatOptionsFromOverlay(): HTMLElement[] {
    const _containerElement = TestBed.get(OverlayContainer).getContainerElement();
    return Array.from(_containerElement.querySelectorAll('mat-option'));
  }

});
