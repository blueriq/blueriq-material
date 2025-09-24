import {ContainerTemplate} from '@blueriq/core/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession} from '@blueriq/angular/testing';
import * as moment from 'moment/moment';
import {SummaryComponent} from './summary.component';
import {SummaryModule} from './summary.module';
import {DEFAULT_DATETIME_FROM_NOW_FORMAT, DEFAULT_DATETIME_PATTERN} from '@shared/date/bq-date-parser';

describe('SummaryComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<SummaryComponent>;
  let session: BlueriqTestSession;

  const nextDay = moment().add(1, 'days');
  const fiveDecember2017 = moment('2017-12-05 17:00:00', 'YYYY-MM-DD HH:mm:ss');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        SummaryModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    container = ContainerTemplate.create('statisticContainer')
      .contentStyle('summary').properties({
        'reference': '12345'
      }).children(
        createPhaseEntry('Start', 'Completed'),
        createPhaseEntry('Main', 'Current'),
        createPhaseEntry('Complete', 'Future'),
        createResultEntry('Result1', true),
        createResultEntry('Result2', false),
        createDeadlineEntry('Deadline', [nextDay, fiveDecember2017]),
      );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(SummaryComponent);
  });

  it('should render the correct case reference', () => {
    const headers = component.nativeElement.querySelectorAll('h3');
    expect(headers.length).toBe(4);
    expect(headers[0].innerHTML).toBe('Case reference');
    expect(headers[0].nextSibling.innerHTML).toBe('12345');
  });

  it('should render the correct phases', () => {
    const headers = component.nativeElement.querySelectorAll('h3');
    expect(headers.length).toBe(4);
    expect(headers[1].innerHTML).toBe('Phases');

    const phase1 = headers[1].nextElementSibling;
    expect(phase1.firstElementChild.className).toContain('mat-icon');
    expect(phase1.lastElementChild.innerHTML).toBe('Start');

    const phase2 = phase1.nextElementSibling;
    expect(phase2.firstElementChild.className).toContain('mat-icon');
    expect(phase2.lastElementChild.innerHTML).toBe('Main');

    const phase3 = phase2.nextElementSibling;
    expect(phase3.firstElementChild.className).toContain('mat-icon');
    expect(phase3.lastElementChild.innerHTML).toBe('Complete');
  });

  it('should render the correct results', () => {
    const headers = component.nativeElement.querySelectorAll('h3');
    expect(headers.length).toBe(4);
    expect(headers[2].innerHTML).toBe('Results');

    const result1 = headers[2].nextElementSibling;
    expect(result1.firstElementChild.className).toContain('mat-icon');
    expect(result1.lastElementChild.innerHTML).toBe('Result1');

    const result2 = result1.nextElementSibling;
    expect(result2.firstElementChild.className).toContain('mat-icon');
    expect(result2.lastElementChild.innerHTML).toBe('Result2');
  });

  it('should render the correct deadlines', () => {
    const headers = component.nativeElement.querySelectorAll('h3');
    expect(headers.length).toBe(4);
    expect(headers[3].innerHTML).toBe('Deadlines');

    const deadlineIcon = component.nativeElement.querySelector('mat-icon[fontIcon="calendar_today"]');
    expect(deadlineIcon.nextElementSibling.innerHTML).toBe('Deadline');

    const firstExpirationTimeIcon = component.nativeElement.querySelector('mat-icon[fontIcon="hourglass_empty"]');
    expect(firstExpirationTimeIcon.nextElementSibling.innerHTML).toBe(`expires at ${nextDay.format(DEFAULT_DATETIME_PATTERN)}`);

    const secondExpirationTimeIcon = component.nativeElement.querySelector('mat-icon[fontIcon="clear"]');
    expect(secondExpirationTimeIcon.nextElementSibling.innerHTML).toBe(`expired ${fiveDecember2017.format(DEFAULT_DATETIME_FROM_NOW_FORMAT)}`);
  });

  function createPhaseEntry(name: string, progress: string): ContainerTemplate {
    return ContainerTemplate.create('somePhaseEntry')
      .contentStyle('phaseEntry')
      .properties({
        'name': name,
        'progress': progress,
      });
  }

  function createResultEntry(name: string, achieved: boolean): ContainerTemplate {
    return ContainerTemplate.create('someResultEntry')
      .contentStyle('resultEntry')
      .properties({
        'name': name,
        'achieved': achieved,
      });
  }

  function createDeadlineEntry(name: string, expirationTimes: moment.Moment[]): ContainerTemplate {
    return ContainerTemplate.create('someDeadlineEntry')
      .contentStyle('deadlineEntry')
      .properties({
        'name': name,
      }).children(...expirationTimes.map(expirationTime => ContainerTemplate
          .create('someExpirationTime')
          .contentStyle('expirationTimeEntry')
          .properties({
            'expirationtime': expirationTime.format('DD-MM-YYYY HH:mm:ss'),
          }),
        ),
      );
  }
});
