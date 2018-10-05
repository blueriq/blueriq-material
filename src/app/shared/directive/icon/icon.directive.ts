import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { PresentationStyles } from '@blueriq/core';
import { BqPresentationStyles } from '../../../modules/BqPresentationStyles';

/**
 * This directive can be added to <mat-icon> that will pick the correct icon based on the container's presentation styles.
 * It is meant for use in mat-icon only!
 */
@Directive({
  selector: '[bqIcon]'
})
export class BqIconDirective {

  private _class: string;

  constructor(private elementRef: ElementRef) {
  }

  @Input()
  set bqIcon(presentationStyles: PresentationStyles) {
    const fontAwesomeIcons = presentationStyles.get(style => style.startsWith(BqPresentationStyles.ICON_FA_PREFIX));
    const materialIcons = presentationStyles.get(style => style.startsWith(BqPresentationStyles.ICON_MAT_PREFIX));
    if (fontAwesomeIcons) {
      let iconName = fontAwesomeIcons.replace(new RegExp('^' + BqPresentationStyles.ICON_FA_PREFIX), '');
      iconName = iconName.replace('_', '-');
      iconName = this.getMappedFaIcon(iconName);
      this._class = 'fa fa-' + iconName;
    } else if (materialIcons) {
      let iconName = materialIcons.replace(new RegExp('^' + BqPresentationStyles.ICON_MAT_PREFIX), '');
      iconName = iconName.toLowerCase();
      this._class = 'mat-icon material-icons ' + iconName;
      this.elementRef.nativeElement.innerHTML = iconName;
    }
  }

  @HostBinding('attr.class')
  get class(): string {
    return this._class;
  }

  /**
   * In the knockout/bootstrap theme these font-awesome icons are mapped.
   * These should become deprecated and use the actual name used in the font-awesome library
   *
   * returns the mapped icon and if no icon found the actual name is returned
   * */
  private getMappedFaIcon(name: string): string {
    const mappedIcons = {
      'exclamation_sign': 'exclamation-circle',
      'info_sign': 'info-circle',
      'remove': 'times',
      'remove_circle': 'times circle',
      'time': 'clock-o',
      'warning_sign': 'exclamation-triangle',
      'signout': 'sign-out',
      'file': 'file-o',
      'file_pdf': 'file-pdf-o',
      'file_image': 'file-image-o'
    };
    const mappedName = mappedIcons[name];
    return mappedName ? mappedName : name;
  }

}
