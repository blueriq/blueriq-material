import type { Mocked } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { LiveUpdatesService } from '@blueriq/angular/live-updates';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActivateTaskAction, DeactivateTaskAction, TaskAwareService } from '@shared/dcm/task-aware.service';
import { Subject } from 'rxjs';

describe('Task Aware Service', () => {
  let actions: Subject<any>;
  let liveUpdatesService: LiveUpdatesService;
  let effects: TaskAwareService;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(async() => {
    liveUpdatesService = { subscribe: vi.fn(), unsubscribe: vi.fn() } as unknown as Mocked<LiveUpdatesService>;
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

  it('responds on activateTaskAction', async () => {
    const action = new ActivateTaskAction('123-abc');
    effects.activateTaskActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(liveUpdatesService.subscribe).toHaveBeenCalledWith('/topic/task/123-abc');
  });

  it('responds on deactivateTaskAction', async () => {
    const action = new DeactivateTaskAction('123-abc');
    effects.deactivateTaskActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(liveUpdatesService.unsubscribe).toHaveBeenCalledWith('/topic/task/123-abc');
  });

});
