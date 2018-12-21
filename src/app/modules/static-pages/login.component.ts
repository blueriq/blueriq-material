import { Component, isDevMode } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@blueriq/angular';

@Component({
  selector: 'bq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });
  failed = false;

  constructor(private readonly authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe({
      next: result => {
        if (result.success) {
          const { returnUrl } = this.route.snapshot.queryParams;
          this.router.navigate([returnUrl || '/']);
        } else {
          this.failed = true;
        }
      },
      error: (e) => {
        this.failed = true;
        if (isDevMode()) {
          console.error(e);
        }
      },
    });
  }

}
