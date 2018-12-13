export class BqPresentationStyles {

  // New presentation styles
  static ALIGNRIGHT = 'AlignRight';
  static BUTTON = 'Button';
  static FLAT_BUTTON = 'FlatButton';
  static HORIZONTAL = 'Horizontal';
  static INTRODUCTION = 'Introduction';
  static DATEPICKERMATERIAL = 'DatepickerMaterial';
  static RADIO = 'Radio';
  static ACCENT = 'Accent';
  static TERTIARY = 'Tertiary';
  static TRANSPARENT = 'Transparent';
  static WARNING = 'Warning';
  static LARGETEXT = 'LargeText';
  static AUTOCOMPLETE = 'Autocomplete';
  static ONLYICON = 'OnlyIcon';
  static ANIMATION = 'Animation';
  static STATISTICPIE = 'StatisticPie';
  static STATISTICBAR = 'StatisticBar';
  static STATISTICDOUGHNUT = 'StatisticDoughnut';
  static STATISTICRADAR = 'StatisticRadar';
  static STATISTICLINE = 'StatisticLine';
  static STATISTICPOLAR = 'StatisticPolar';
  static SWITCH = 'Switch';

  // Presentation styles reused from AquimaLibrary, these can be refactored in the future
  static DANGER = 'Danger';
  static DISABLED = 'Disabled';
  static INFO = 'Info';
  static PRIMARY = 'Primary';
  static SUCCESS = 'Success';
  static TEXTEMPHASIS = 'TextEmphasis';
  static TEXTEMPHASIS_SUBTLE = 'TextEmphasisSubtle';
  static TEXTEMPHASIS_INTENSE = 'TextEmphasisIntense';

  // Prefixes
  static WEIGHT_PREFIX = 'Weight';
  static WEIGHT_REGEXP = new RegExp('^' + BqPresentationStyles.WEIGHT_PREFIX + '(\\d+)$');
  static ICON_FA_PREFIX = 'icon_';
  static ICON_MAT_PREFIX = 'Icon';

  // Presentation styles which are deprecated in Blueriq 12.0
  static DEPRECATED_ALIGNRIGHT = 'align_right'; // New style is 'AlignRight'
  static DEPRECATED_ANIMATE = 'animate'; // New style is 'Animation'
  static DEPRECATED_HORIZONTAL = 'options_horizontal'; // New style is 'Horizontal'
  static DEPRECATED_VERTICAL = 'options_vertical'; // New style is 'Radio'
  static DEPRECATED_TOGGLE = 'toggle'; // New style is 'Switch'
  static DEPRECATED_MEMO = 'memo'; // New style is 'LargeText'
  static DEPRECATED_ONLYICON = 'only_icon'; // New style is 'LargeText'
  static DEPRECATED_STATISTIC_PIE = 'pie';
  static DEPRECATED_STATISTIC_BAR = 'bar';
  static DEPRECATED_STATISTIC_DOUGHNUT = 'doughnut';
  static DEPRECATED_STATISTIC_RADAR = 'radar';
  static DEPRECATED_STATISTIC_LINE = 'line';
  static DEPRECATED_STATISTIC_POLAR = 'polar';

}
