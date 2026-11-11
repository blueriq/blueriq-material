import type { Mocked } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  LiveUpdate,
  LiveUpdateAction,
  LiveUpdatesConnectionLostAction,
  LiveUpdatesReconnectedAction,
  PingUpdate,
  TaskAvailableZoneUpdate,
  TaskCompletedUpdate,
  TaskCompletedZoneUpdate,
} from '@blueriq/angular/live-updates';
import { provideMockActions } from '@ngrx/effects/testing';
import { LiveUpdatesEffect } from '@shared/effects/live-updates/live-updates.effect';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

describe('Live Updates Effect', () => {
  let actions: Subject<any>;
  let effects: LiveUpdatesEffect;
  let toastrServiceSpy: ToastrService;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(async() => {
    toastrServiceSpy = { info: vi.fn(), success: vi.fn(), error: vi.fn(), warning: vi.fn() } as unknown as Mocked<ToastrService>;
    actions = new Subject();

    await TestBed.configureTestingModule({
      providers: [
        LiveUpdatesEffect,
        provideMockActions(() => actions),
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();
    effects = TestBed.inject(LiveUpdatesEffect);
  });

  it('responds on Notification live update', async () => {
    const action = new LiveUpdateAction(new PingUpdate({ type: 'ping' }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Ping received');
  });

  it('responds on TaskCompleted live update', async () => {
    const action = new LiveUpdateAction(new TaskCompletedUpdate({
      type: 'taskCompleted', taskId: 'def-123-abc', taskNameDefaultLanguage: 'Toevoegen' +
        ' Bewijsstukken',
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Task Toevoegen Bewijsstukken is completed', 'Task Completed');
  });

  it('shows technical name when TaskCompleted live update from Zone has no displayNames', async () => {
    const action = new LiveUpdateAction(new TaskCompletedZoneUpdate({
      type: 'taskCompletedZone', taskName: 'technicalName', taskDisplayNames: {},
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Task technicalName is completed', 'Task Completed');
  });

  it('shows first display name when TaskCompleted live update from Zone has displayNames', async () => {
    const action = new LiveUpdateAction(new TaskCompletedZoneUpdate({
      type: 'taskCompletedZone',
      taskName: 'technicalName',
      taskDisplayNames: {'en-US': 'Functional name', 'nl-NL': 'Functionele naam'},
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Task Functional name is completed', 'Task Completed');
  });

  it('shows technical name when TaskAvailable live update from Zone has no displayNames', async () => {
    const action = new LiveUpdateAction(new TaskAvailableZoneUpdate({
      type: 'taskAvailableZone', taskName: 'technicalName', taskDisplayNames: {},
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.info).toHaveBeenCalledWith('Task technicalName is available', 'Task Available');
  });

  it('shows first display name when TaskAvailable live update from Zone has displayNames', async () => {
    const action = new LiveUpdateAction(new TaskAvailableZoneUpdate({
      type: 'taskAvailableZone',
      taskName: 'technicalName',
      taskDisplayNames: {'en-US': 'Functional name', 'nl-NL': 'Functionele naam'},
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.info).toHaveBeenCalledWith('Task Functional name is available', 'Task Available');
  });

  it('does not respond to Unsupported live update', async () => {
    const action = new LiveUpdateAction(new UnknownLiveUpdate());
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.info).not.toHaveBeenCalled();
    expect(toastrServiceSpy.success).not.toHaveBeenCalled();
    expect(toastrServiceSpy.warning).not.toHaveBeenCalled();
    expect(toastrServiceSpy.success).not.toHaveBeenCalled();
  });

  class UnknownLiveUpdate implements LiveUpdate {
    readonly type: 'unknown';

    constructor() {
    }
  }

  it('does respond to connection lost', async () => {
    const action = new LiveUpdatesConnectionLostAction();
    effects.connectionLostActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('The connection with the event bus is lost. You will not receive live updates while the application is trying to reconnect.',
      'Connection lost');
  });

  it('does respond to reconnection', async () => {
    const action = new LiveUpdatesReconnectedAction();
    effects.reconnectedActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(toastrServiceSpy.info).toHaveBeenCalledWith('The connection with the event bus has been reestablished. Reload to get the latest changes.', 'Connection reestablished');
  });

});
