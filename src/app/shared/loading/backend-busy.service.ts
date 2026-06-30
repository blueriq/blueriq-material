import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivityType, GlobalLoadingActivity } from '@blueriq/angular';
import { Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Delay, in milliseconds, before a field refresh disables buttons. A button click blurs the
 * focused field, which itself triggers the refresh; disabling immediately would disable the button
 * in the same change-detection cycle as that click and the press would be lost. The delay lets the
 * click that starts a refresh go through (it completes in a few ms, and the resulting interaction
 * then disables the button immediately), while a click attempted against an already-running refresh
 * is still blocked. Kept under the loading overlay's 400ms so buttons lock before the spinner shows.
 */
const FIELD_REFRESH_DISABLE_DELAY_MS = 250;

/**
 * Reports whether a request to the Blueriq backend is currently in progress, so the UI can prevent
 * the user from triggering additional requests while one is already in flight.
 *
 * Whereas the loading overlay deliberately waits 400ms before showing a spinner to avoid flicker,
 * this service reacts immediately for blocking requests (via `isActive`) so the UI locks the instant
 * such a request starts. It exposes two levels:
 * - {@link busy$}/{@link busy} — disables buttons. Covers session starts and interactions
 *   immediately, and field refreshes after {@link FIELD_REFRESH_DISABLE_DELAY_MS}ms (see above).
 * - {@link blocking$}/{@link blocking} — makes the page inert. Covers only session starts and
 *   interactions; field refreshes are excluded so the form stays tabbable while it recalculates.
 */
@Injectable({ providedIn: 'root' })
export class BackendBusyService {
  private readonly loadingActivity = inject(GlobalLoadingActivity);

  private readonly startingSession$ = this.loadingActivity.isActive(ActivityType.StartingSession);
  private readonly interaction$ = this.loadingActivity.isActive(ActivityType.Interaction);

  /** Emits `true` while a request that should disable buttons is in flight. */
  readonly busy$: Observable<boolean> = combineLatest([
    this.startingSession$,
    this.interaction$,
    this.loadingActivity.isActiveWithDelay(ActivityType.FieldRefresh, FIELD_REFRESH_DISABLE_DELAY_MS),
  ]).pipe(
    map(activities => activities.some(Boolean)),
    distinctUntilChanged(),
  );

  /** Emits `true` while a blocking request (session start or interaction) is in flight. */
  readonly blocking$: Observable<boolean> = combineLatest([
    this.startingSession$,
    this.interaction$,
  ]).pipe(
    map(activities => activities.some(Boolean)),
    distinctUntilChanged(),
  );

  /** Signal mirror of {@link busy$}, convenient for templates and synchronous component logic. */
  readonly busy: Signal<boolean> = toSignal(this.busy$, { initialValue: false });

  /** Signal mirror of {@link blocking$}, convenient for templates and synchronous component logic. */
  readonly blocking: Signal<boolean> = toSignal(this.blocking$, { initialValue: false });
}
