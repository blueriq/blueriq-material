import { Component, Host } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Container, Link } from '@blueriq/core';
import { PresentationStyles } from '../presentationstyles/presentationstyles';
import { DownloadService } from './download.service';

@Component({
  templateUrl: './download.component.html'
})
@BlueriqComponent({
  type: Container,
  selector: '*:has(* > [type=link])'
})
export class DownloadComponent {

  @BlueriqChild(Link, { descendants: true, required: true })
  public link: Link;

  constructor(
    @Host() public container: Container,
    public downloadService: DownloadService,
    private readonly blueriqSession: BlueriqSession) {
  }

  hasButtonPresentationStyle() {
    return this.container.styles.has(PresentationStyles.BUTTON_LINK);
  }

  getDownloadUrl(): string {
    return this.downloadService.getDownloadUrl(this.link, this.blueriqSession);
  }

}
