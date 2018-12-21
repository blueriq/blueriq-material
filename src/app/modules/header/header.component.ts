import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Container, Page, TextItem } from '@blueriq/core';

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

  constructor(@Host() @Optional() public dashboardHeader: Container,
              private readonly authService: AuthService,
              private router: Router,
              private readonly route: ActivatedRoute) {
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
        this.page = <Page> parent;
      }
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.route.params.subscribe(() => {
        const returnUrl = this.router.url;
        this.router.navigate(['/login'], { queryParams: { returnUrl } });
      });
    });
  }

}
