import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { DEFAULT_DATETIME_FROM_NOW_FORMAT } from '@shared/date/bq-date-parser';
import * as moment from 'moment';
import { CommentModule } from '../comment.module';
import { CommentListComponent } from './comment.list.component';

describe('CommentListComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<CommentListComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        CommentModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create()
    .contentStyle('commentlist')
    .children(
      generateCommentEntry('hello', new Date('2012-12-12'), 'title1', 'Tilly'),
      generateCommentEntry('done things', new Date('2014-12-12'), 'title2', 'Tine'),
      generateCommentEntry('end case', new Date(), 'title1', 'Double G')
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(CommentListComponent);
    component.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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
    expect(dates[0].innerHTML).toBe(moment(new Date('2012-12-12')).format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
    expect(dates[1].innerHTML).toBe(moment(new Date('2014-12-12')).format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
    expect(dates[2].innerHTML).toBe(moment(new Date()).fromNow(false));
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

  it('should parse the date correctly', () => {
    // init
    const commentListComponent: CommentListComponent = component.componentInstance;

    // SUT
    const now = commentListComponent.dateToHumanReadableFormat(new Date());
    const longTimeAgo = commentListComponent.dateToHumanReadableFormat(new Date('2010-12-12'));

    // Verify
    expect(now).toBe(moment(new Date()).fromNow(false));
    expect(longTimeAgo).toBe(moment(new Date('2010-12-12')).format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
  });

  it('should contain 3 parsed CommentEntries', () => {
    // init
    const commentListComponent: CommentListComponent = component.componentInstance;

    // Verify
    expect(commentListComponent.commentList.entries$.subscribe(entries => {
      expect(entries.length).toBe(3);
    }));
  });

  function generateCommentEntry(comment, date, title, username) {
    return ContainerTemplate
    .create('commentEntry')
    .contentStyle('commentEntry')
    .properties(
      {
        'comment': comment,
        'date': date,
        'title': title,
        'username': username
      }
    );
  }
});
