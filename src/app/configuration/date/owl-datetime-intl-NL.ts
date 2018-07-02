import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { Subject } from 'rxjs/Subject';

export class OwlDatetimeIntlNL implements OwlDateTimeIntl {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'Voeg een seconde toe';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'Trek er een seconde af';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'Voeg een minuut toe';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'Trek er een minuut af';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'Voeg een uur toe';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'Trek er een uur af';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Vorige maand';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Volgende maand';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Vorig jaar';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Volgend jaar';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel = 'Vorige 21 jaar';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel = 'Volgende 21 jaar';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Verander naar maandoverzicht';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Kies maand en jaar';

  /** A label for the cancel button */
  cancelBtnLabel = 'Annuleer';

  /** A label for the set button */
  setBtnLabel = 'Ok';

  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'Van';

  /** A label for the range 'to' in picker info */
  rangeToLabel = 'Naar';

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'PM';

  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void>;
}
