import { Component, isDevMode, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'bq-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  username = new FormControl('', { validators: Validators.required, nonNullable: true });
  password = new FormControl('', { validators: Validators.required, nonNullable: true });
  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });
  failed = false;

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe({
      next: result => {
        if (result.success) {
          const returnPath = this.route.snapshot.queryParams['returnPath'];
          this.router.navigateByUrl(returnPath || '/');
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
