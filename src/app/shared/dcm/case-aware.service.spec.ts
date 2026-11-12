import type { Mocked } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { LiveUpdatesService } from '@blueriq/angular/live-updates';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActivateCaseAction, CaseAwareService, DeactivateCaseAction } from '@shared/dcm/case-aware.service';
import { Subject } from 'rxjs';

describe('Case Aware Service', () => {
  let actions: Subject<any>;
  let liveUpdatesService: LiveUpdatesService;
  let effects: CaseAwareService;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(async() => {
    liveUpdatesService = { subscribe: vi.fn(), unsubscribe: vi.fn() } as unknown as Mocked<LiveUpdatesService>;
    actions = new Subject();

    await TestBed.configureTestingModule({
      providers: [
        CaseAwareService,
        provideMockActions(() => actions),
        { provide: LiveUpdatesService, useValue: liveUpdatesService },
      ],
    }).compileComponents();
    effects = TestBed.inject(CaseAwareService);
  });

  it('responds on activateCaseAction', async () => {
    const action = new ActivateCaseAction('123-abc');
    effects.activateCaseActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(liveUpdatesService.subscribe).toHaveBeenCalledWith('/topic/case/123-abc');
  });

  it('responds on deactivateCaseAction', async () => {
    const action = new DeactivateCaseAction('123-abc');
    effects.deactivateCaseActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(liveUpdatesService.unsubscribe).toHaveBeenCalledWith('/topic/case/123-abc');
  });

});
