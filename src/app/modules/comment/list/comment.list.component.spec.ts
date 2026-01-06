import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { DEFAULT_DATETIME_FROM_NOW_FORMAT } from '@shared/date/bq-date-parser';
import moment from 'moment/min/moment-with-locales';
import { CommentModule } from '../comment.module';
import { CommentListComponent } from './comment.list.component';

describe('CommentListComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<CommentListComponent>;
  let session: BlueriqTestSession;

  const now = moment();
  const fiveDecember2017 = moment('2017-12-05', 'YYYY-MM-DD');
  const fiveDecember2016 = moment('2016-12-05', 'YYYY-MM-DD');

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        CommentModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    container = ContainerTemplate.create()
      .contentStyle('commentlist')
      .children(
        generateCommentEntry('hello', fiveDecember2016, 'title1', 'Tilly'),
        generateCommentEntry('done things', fiveDecember2017, 'title2', 'Tine'),
        generateCommentEntry('end case', now, 'title1', 'Double G'),
      );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(CommentListComponent);
    component.detectChanges();
  });

  it('should contain correct header text', () => {
    // init
    const headers = component.nativeElement.querySelectorAll('.header');

    // verify
    // Note: sorting is done by the backend.
    expect(headers.length).toBe(3);
    expect(headers[0].innerHTML).toContain('Tilly');
    expect(headers[0].innerHTML).toContain('title1');

    expect(headers[1].innerHTML).toContain('Tine');
    expect(headers[1].innerHTML).toContain('title2');

    expect(headers[2].innerHTML).toContain('Double G');
    expect(headers[2].innerHTML).toContain('title1');
  });

  it('should contain correct date', () => {
    // init
    const dates = component.nativeElement.querySelectorAll('.date');

    // verify
    expect(dates.length).toBe(3);
    expect(dates[0].innerHTML).toBe(fiveDecember2016.format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
    expect(dates[1].innerHTML).toBe(fiveDecember2017.format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
    expect(dates[2].innerHTML).toBe(now.fromNow(false));
  });

  it('should contain correct comment text', () => {
    // init
    const comments = component.nativeElement.querySelectorAll('.comment');

    // verify
    expect(comments.length).toBe(3);
    expect(comments[0].innerHTML).toBe('hello');
    expect(comments[1].innerHTML).toBe('done things');
    expect(comments[2].innerHTML).toBe('end case');
  });

  function generateCommentEntry(comment: string, date: moment.Moment, title: string, username: string) {
    return ContainerTemplate
      .create('commentEntry')
      .contentStyle('commentEntry')
      .properties(
        {
          'comment': comment,
          'date': date.format('DD-MM-YYYY HH:mm:ss'),
          'title': title,
          'username': username,
        },
      );
  }
});
