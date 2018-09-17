import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { DEFAULT_DATE_FROM_NOW_FORMAT } from '@shared/date/bq-date-parser';
import * as moment from 'moment';
import { TimelineComponent } from './timeline.component';
import { TimelineModule } from './timeline.module';

describe('TimelineComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<TimelineComponent>;
  let session: BlueriqTestSession;
  let now: Date;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        TimelineModule
      ]
    });
  }));

  beforeEach(() => {
    now = new Date();
    container = ContainerTemplate.create('statisticContainer')
    .contentStyle('timeline').children(
      createTimelineEntry('Henk', new Date('2018-05-05 17:00:00'), 'Request driving licence', 'RequestLicence'),
      createTimelineEntry('Klaas', now, 'Accept driving licence', 'AcceptLicence')
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(TimelineComponent);
  });

  it('should render the correct users', () => {
    const usernames = component.nativeElement.querySelectorAll('.user');
    expect(usernames.length).toBe(2);
    expect(usernames[0].innerHTML).toBe('Henk');
    expect(usernames[1].innerHTML).toBe('Klaas');
  });

  it('should render the correct actions', () => {
    const actions = component.nativeElement.querySelectorAll('.action-name');
    expect(actions.length).toBe(2);
    expect(actions[0].innerHTML).toBe('Request driving licence');
    expect(actions[1].innerHTML).toBe('Accept driving licence');
  });

  it('should render the correct entry data', () => {
    const entry = component.nativeElement.querySelectorAll('.entry-name');
    expect(entry.length).toBe(2);
    expect(entry[0].innerHTML).toBe('RequestLicence');
    expect(entry[1].innerHTML).toBe('AcceptLicence');
  });

  it('should render the correct entry date', () => {
    const date = component.nativeElement.querySelectorAll('.date');
    expect(date.length).toBe(2);
    expect(date[0].innerHTML).toBe(moment(new Date('2018-05-05 17:00:00')).format(DEFAULT_DATE_FROM_NOW_FORMAT));
    expect(date[1].innerHTML).toBe(moment(now).fromNow(false));
  });

  it('should render the correct timestamp', () => {
    const time = component.nativeElement.querySelectorAll('.time');
    expect(time.length).toBe(2);
    expect(time[0].innerHTML).toBe('17:00');
    expect(time[1].innerHTML).toBe(moment(now).format('HH:mm'));
  });

  function createTimelineEntry(username, datetime,
                               actionName, entryName): ContainerTemplate {
    return ContainerTemplate.create('someTimelineEntry')
    .contentStyle('timelineEntry')
    .properties({
      'username': username,
      'datetime': datetime,
      'actionname': actionName,
      'entryname': entryName
    });
  }

});
