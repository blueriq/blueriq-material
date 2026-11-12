import { NgClass } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { Action } from '@blueriq/angular';
import { BlueriqDashboard, DashboardPage } from '@blueriq/dashboard';
import { Actions } from '@ngrx/effects';
import { BehaviorSubject, Subject } from 'rxjs';
import { RefreshAction } from '../events/actions';
import { DashboardPageComponent } from './dashboard-page.component';

describe('Dashboard Page', () => {

  const page: DashboardPage = {
    id: 'main',
    menuItems: [],
    layout: 'two-equal-columns',
    columns: [
      { widgets: [{ id: 'flow', type: 'blueriq-flow', baseUrl: '/' }] },
      {
        widgets: [
          { id: 'task', type: 'blueriq-task', baseUrl: '/', projectName: 'project', languageCode: 'en' },
          { id: 'intake', type: 'blueriq-intake', baseUrl: '/', caseType: 'case', languageCode: 'en' },
        ],
      },
    ],
  };

  let page$: BehaviorSubject<DashboardPage | null>;
  let actions$: Subject<Action>;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async() => {
    page$ = new BehaviorSubject<DashboardPage | null>(null);
    actions$ = new Subject<Action>();
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [
        { provide: BlueriqDashboard, useValue: { page: page$ } },
        { provide: Actions, useValue: actions$ },
      ],
    }).overrideComponent(DashboardPageComponent, { set: { imports: [NgClass], schemas: [NO_ERRORS_SCHEMA] } }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
  });

  it('should render nothing without a page', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.page')).toBeNull();
  });

  it('should render the widgets of the page in their columns', () => {
    page$.next(page);
    fixture.detectChanges();

    const columns = fixture.nativeElement.querySelectorAll('.bq-dashboard-column');
    expect(fixture.nativeElement.querySelector('.page').classList).toContain('two-equal-columns');
    expect(columns.length).toEqual(2);
    expect(columns[0].querySelector('bq-flow-widget')).not.toBeNull();
    expect(columns[1].querySelector('bq-task-execution-widget')).not.toBeNull();
    expect(columns[1].querySelector('bq-intake-widget')).not.toBeNull();
  });

  it('should rerender the flow widget on a refresh', fakeAsync(() => {
    page$.next(page);
    fixture.detectChanges();

    actions$.next(new RefreshAction());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('bq-flow-widget')).toBeNull();

    flushMicrotasks();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('bq-flow-widget')).not.toBeNull();
  }));

  it('should stop listening after it is destroyed', () => {
    fixture.detectChanges();
    fixture.destroy();

    page$.next(page);

    expect(fixture.componentInstance.page).toBeNull();
  });
});
