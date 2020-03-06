import { Component, Input, OnInit, Optional } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Container, Page, TextItem } from '@blueriq/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'bq-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@BlueriqComponent({
  type: Container,
  selector: 'dashboard_header',
})
export class HeaderComponent implements OnInit {

  @BlueriqChild(TextItem, '.authenticated_user', { exclude: true, optional: true })
  authenticatedUser: TextItem;

  @BlueriqChild(TextItem, '.logout_link', { exclude: true, optional: true })
  logoutLink: TextItem;

  @Input()
  page: Page;

  constructor(@Optional() public dashboardHeader: Container,
              private readonly authService: AuthService) {
  }

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
    this.authService.logoutAndNavigate();
  }

}
