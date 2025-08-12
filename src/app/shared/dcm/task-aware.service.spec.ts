import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LiveUpdatesService } from '@blueriq/angular/live-updates';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActivateTaskAction, DeactivateTaskAction, TaskAwareService } from '@shared/dcm/task-aware.service';
import { Subject } from 'rxjs';

describe('Task Aware Service', () => {
  let actions: Subject<any>;
  let liveUpdatesService: LiveUpdatesService;
  let effects: TaskAwareService;

  beforeEach(async() => {
    liveUpdatesService = jasmine.createSpyObj<LiveUpdatesService>('LiveUpdatesService', ['subscribe', 'unsubscribe']);
    actions = new Subject();

    await TestBed.configureTestingModule({
      providers: [
        TaskAwareService,
        provideMockActions(() => actions),
        { provide: LiveUpdatesService, useValue: liveUpdatesService },
      ],
    }).compileComponents();
    effects = TestBed.inject(TaskAwareService);
  });

  it('responds on activateTaskAction', fakeAsync(() => {
    const action = new ActivateTaskAction('123-abc');
    effects.activateTaskActions$.subscribe();
    actions.next(action);

    tick();

    expect(liveUpdatesService.subscribe).toHaveBeenCalledWith('/topic/task/123-abc');
  }));

  it('responds on deactivateTaskAction', fakeAsync(() => {
    const action = new DeactivateTaskAction('123-abc');
    effects.deactivateTaskActions$.subscribe();
    actions.next(action);

    tick();

    expect(liveUpdatesService.unsubscribe).toHaveBeenCalledWith('/topic/task/123-abc');
  }));

});
