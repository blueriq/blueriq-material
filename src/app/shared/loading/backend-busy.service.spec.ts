import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivityType, GlobalLoadingActivity } from '@blueriq/angular';
import { BackendBusyService } from './backend-busy.service';

describe('BackendBusyService', () => {
  let service: BackendBusyService;
  let loadingActivity: GlobalLoadingActivity;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalLoadingActivity, BackendBusyService],
    });
    loadingActivity = TestBed.inject(GlobalLoadingActivity);
    service = TestBed.inject(BackendBusyService);
  });

  describe('busy (disables buttons)', () => {
    it('is not busy when idle', () => {
      let busy!: boolean;
      service.busy$.subscribe(b => busy = b);

      expect(busy).toBe(false);
      expect(service.busy()).toBe(false);
    });

    it('is busy immediately on interaction, without the 400ms loading delay', () => {
      let busy!: boolean;
      service.busy$.subscribe(b => busy = b);

      loadingActivity.start(ActivityType.Interaction);
      expect(busy).toBe(true);
      expect(service.busy()).toBe(true);

      loadingActivity.stop(ActivityType.Interaction);
      expect(busy).toBe(false);
    });

    it('is busy immediately while a session is starting', () => {
      let busy!: boolean;
      service.busy$.subscribe(b => busy = b);

      loadingActivity.start(ActivityType.StartingSession);
      expect(busy).toBe(true);

      loadingActivity.stop(ActivityType.StartingSession);
      expect(busy).toBe(false);
    });

    it('disables buttons only after a delay on field refresh (so the triggering click survives)', fakeAsync(() => {
      let busy!: boolean;
      const subscription = service.busy$.subscribe(b => busy = b);

      loadingActivity.start(ActivityType.FieldRefresh);
      expect(busy).toBe(false); // not disabled immediately: the click that triggers the refresh must go through

      tick(250);
      expect(busy).toBe(true); // a refresh that is still running after the delay does disable buttons

      loadingActivity.stop(ActivityType.FieldRefresh);
      tick(); // the delayed stream debounces its `false` through a timer(0)
      expect(busy).toBe(false);
      subscription.unsubscribe();
    }));

    it('does not disable buttons for a field refresh that completes within the delay', fakeAsync(() => {
      let busy!: boolean;
      const subscription = service.busy$.subscribe(b => busy = b);

      loadingActivity.start(ActivityType.FieldRefresh);
      tick(100);
      loadingActivity.stop(ActivityType.FieldRefresh);
      tick(250);

      expect(busy).toBe(false);
      subscription.unsubscribe();
    }));
  });

  describe('blocking (makes the page inert)', () => {
    it('is blocking immediately on a session start and an interaction', () => {
      let blocking!: boolean;
      service.blocking$.subscribe(b => blocking = b);

      loadingActivity.start(ActivityType.StartingSession);
      expect(blocking).toBe(true);
      loadingActivity.stop(ActivityType.StartingSession);
      expect(blocking).toBe(false);

      loadingActivity.start(ActivityType.Interaction);
      expect(blocking).toBe(true);
      loadingActivity.stop(ActivityType.Interaction);
      expect(blocking).toBe(false);
    });

    it('never blocks for a field refresh, so the form stays tabbable while it recalculates', fakeAsync(() => {
      let blocking!: boolean;
      const subscription = service.blocking$.subscribe(b => blocking = b);

      loadingActivity.start(ActivityType.FieldRefresh);
      tick(1000);
      expect(blocking).toBe(false);
      expect(service.blocking()).toBe(false);

      loadingActivity.stop(ActivityType.FieldRefresh);
      subscription.unsubscribe();
    }));
  });
});
