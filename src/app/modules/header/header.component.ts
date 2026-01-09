import { Component, Input, OnInit, inject } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BqProjectComponent } from '@blueriq/angular';
import { Container, Page, TextItem } from '@blueriq/core';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'bq-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: 'dashboard_header',
})
export class HeaderComponent implements OnInit {
  dashboardHeader = inject(Container, { optional: true });
  private readonly authService = inject(AuthService);
  private readonly containingProject = inject(BqProjectComponent);


  @BlueriqChild(TextItem, '.authenticated_user', { exclude: true, optional: true })
  authenticatedUser: TextItem;

  @BlueriqChild(TextItem, '.logout_link', { exclude: true, optional: true })
  logoutLink: TextItem;

  @Input()
  page: Page;

  get displayName() {
    if (this.page) {
      return this.page.displayName;
    }
    return '';
  }

  ngOnInit() {
    // If we are a dashboardHeader, look up the parent page
    if (this.dashboardHeader) {
      const parent = this.dashboardHeader.parent;
      if (parent instanceof Page) {
        this.page = parent;
      }
    }
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

}
