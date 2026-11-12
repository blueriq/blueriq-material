import { Component, isDevMode, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'bq-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      MatCard,
      FormsModule,
      ReactiveFormsModule,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      MatFormField,
      MatLabel,
      MatInput,
      MatError,
      MatButton,
    ]
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
