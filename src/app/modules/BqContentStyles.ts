export class BqContentStyles {
  static TABLE = 'table';

  static WIDTH_SMALL = 'Small';
  static WIDTH_MEDIUM = 'Medium';
  static WIDTH_LARGE = 'Large';
  static WIDTH_FULL = 'Full';
  static WIDTH_RESPONSIVE = 'Responsive';

  static DASHBOARD_HEADER = 'dashboard_header';
  static DASHBOARD_MENU = 'dashboard_menu';
  static DASHBOARD_BODY = 'dashboard_body';
  static DASHBOARD_ROW = 'dashboard_row';
  static DASHBOARD_WIDGET = 'dashboard_widget';
  static DASHBOARD_FLOWWIDGET = 'dashboard_flowwidget';
  static DASHBOARD_COLUMN_PREFIX = 'dashboard_column';

  static TAB = 'tabs';

  static WEIGHT_REGEXP = new RegExp('^' + BqContentStyles.DASHBOARD_COLUMN_PREFIX + '(\\d+)$');
}
