// here is the default text string

import { OwlDateTimeIntl } from 'ng-pick-datetime';

export class DefaultDateTimeIntl implements OwlDateTimeIntl {
  upSecondLabel = 'Add a second';
  downSecondLabel = 'Minus a second';
  upMinuteLabel = 'Add a minute';
  downMinuteLabel = 'Minus a minute';
  upHourLabel = 'Add a hour';
  downHourLabel = 'Minus a hour';
  prevMonthLabel = 'Previous month';
  nextMonthLabel = 'Next month';
  prevYearLabel = 'Previous year';
  nextYearLabel = 'Next year';
  prevMultiYearLabel = 'Previous 21 years';
  nextMultiYearLabel = 'Next 21 years';
  switchToMonthViewLabel = 'Change to month view';
  switchToMultiYearViewLabel = 'Choose month and year';
  cancelBtnLabel = 'Cancel';
  setBtnLabel = 'Set';
  rangeFromLabel = 'From';
  rangeToLabel = 'To';
  hour12AMLabel = 'AM';
  hour12PMLabel = 'PM';
}

export class DutchIntl implements OwlDateTimeIntl {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'Eén seconde meer';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'Eén seconde minder';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'Eén minuut meer';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'Eén minuut minder';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'Eén uur meer';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'Eén uur minder';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Vorige maand';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Volgende maand';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Vorig jaar';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'l\'Volgend jaar';

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
  setBtnLabel = 'Oké';

  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'Van';

  /** A label for the range 'to' in picker info */
  rangeToLabel = 'Naar';

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'Dag';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'Nacht';
}

export class TestInl {
  constructor(public locale: string) {
  }

  setBtnLabel = (this.locale.endsWith('NL')) ? 'Okee' : 'ok';
}
