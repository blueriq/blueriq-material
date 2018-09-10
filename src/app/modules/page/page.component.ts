import { Component, Host } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent {
  constructor(@Host() public page: Page,
              private readonly authService: AuthService,
              private router: Router,
              private readonly route: ActivatedRoute,
              public blueriqSession: BlueriqSession
  ) {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.route.params.subscribe(params => {
        this.router.navigate(['/login'], { queryParams: params });
      });
    });
  }
}
