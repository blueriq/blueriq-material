import { Component, inject, input } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BqProjectComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Container, Page, TextItem } from '@blueriq/core';
import { AuthService } from '../../auth/auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'bq-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [MatToolbar, BqKeyDirective, BlueriqCommonModule, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem]
})
@BlueriqComponent({
  type: Container,
  selector: 'dashboard_header',
})
export class HeaderComponent {
  dashboardHeader = inject(Container, { optional: true });
  private readonly authService = inject(AuthService);
  private readonly containingProject = inject(BqProjectComponent);


  @BlueriqChild(TextItem, '.authenticated_user', { exclude: true, optional: true })
  authenticatedUser: TextItem;

  @BlueriqChild(TextItem, '.logout_link', { exclude: true, optional: true })
  logoutLink: TextItem;

  readonly page = input<Page>();

  get displayName(): string {
    return this.displayedPage()?.displayName ?? '';
  }

  logout() {
    if (this.containingProject.sessionId) {
      // If the project was started using an explicit session id we can't resume that particular session after
      // logout. Instead, navigate to the logged-out page without a return path.
      this.authService.logoutAndNavigate(null);
    } else {
      this.authService.logoutAndNavigate();
    }
  }

  private displayedPage(): Page | undefined {
    const dashboardPage = this.dashboardHeader?.parent;
    return dashboardPage instanceof Page ? dashboardPage : this.page();
  }

}
