import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { Subject } from 'rxjs/Subject';

export class OwlDatetimeIntlDefault implements OwlDateTimeIntl {
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
  readonly changes: Subject<void>;
}
