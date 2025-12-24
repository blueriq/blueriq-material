import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  LiveUpdate,
  LiveUpdateAction,
  LiveUpdatesConnectionLostAction,
  LiveUpdatesReconnectedAction,
  PingUpdate,
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

  beforeEach(async() => {
    toastrServiceSpy = jasmine.createSpyObj<ToastrService>('ToastrService', ['info', 'success', 'error', 'warning']);
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

  it('responds on Notification live update', fakeAsync(() => {
    const action = new LiveUpdateAction(new PingUpdate({ type: 'ping' }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Ping received');
  }));

  it('responds on TaskCompleted live update', fakeAsync(() => {
    const action = new LiveUpdateAction(new TaskCompletedUpdate({
      type: 'taskCompleted', taskId: 'def-123-abc', taskNameDefaultLanguage: 'Toevoegen' +
        ' Bewijsstukken',
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Task Toevoegen Bewijsstukken is completed', 'Task Completed');
  }));

  it('shows technical name when TaskCompleted live update from Zone has no displayNames', fakeAsync(() => {
    const action = new LiveUpdateAction(new TaskCompletedZoneUpdate({
      type: 'taskCompletedZone', taskName: 'technicalName', taskDisplayNames: {},
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Task technicalName is completed', 'Task Completed');
  }));

  it('shows first display name when TaskCompleted live update from Zone has displayNames', fakeAsync(() => {
    const action = new LiveUpdateAction(new TaskCompletedZoneUpdate({
      type: 'taskCompletedZone',
      taskName: 'technicalName',
      taskDisplayNames: {'en-US': 'Functional name', 'nl-NL': 'Functionele naam'},
    }));
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Task Functional name is completed', 'Task Completed');
  }));

  it('does not respond to Unsupported live update', fakeAsync(() => {
    const action = new LiveUpdateAction(new UnknownLiveUpdate());
    effects.liveUpdateAction$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.info).not.toHaveBeenCalled();
    expect(toastrServiceSpy.success).not.toHaveBeenCalled();
    expect(toastrServiceSpy.warning).not.toHaveBeenCalled();
    expect(toastrServiceSpy.success).not.toHaveBeenCalled();
  }));

  class UnknownLiveUpdate implements LiveUpdate {
    readonly type: 'unknown';

    constructor() {
    }
  }

  it('does respond to connection lost', fakeAsync(() => {
    const action = new LiveUpdatesConnectionLostAction();
    effects.connectionLostActions$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.error).toHaveBeenCalledWith('The connection with the event bus is lost. You will not receive live updates while the application is trying to reconnect.',
      'Connection lost');
  }));

  it('does respond to reconnection', fakeAsync(() => {
    const action = new LiveUpdatesReconnectedAction();
    effects.reconnectedActions$.subscribe();
    actions.next(action);

    tick();

    expect(toastrServiceSpy.info).toHaveBeenCalledWith('The connection with the event bus has been reestablished. Reload to get the latest changes.', 'Connection reestablished');
  }));

});
