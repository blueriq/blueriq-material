import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@blueriq/angular';

@Component({
  selector: 'bq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  loginForm = new FormGroup({
    username: this.username,
    password: this.password
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
          const { flow, project, version } = this.route.snapshot.queryParams;
          if (version) {
            console.log('cool 1');
            this.router.navigate(['/flow', project, flow, version]);
          } else if (project && flow) {
            console.log('cool 2');
            this.router.navigate(['/flow', project, flow]);
          } else {
            console.log('Unsufficient params', this.route.snapshot.queryParams);
            this.failed = true;
          }
        } else {
          console.log('no success', result);
          this.failed = true;
        }
      },
      error: (e) => {
        console.log('Dikke error', e);
        this.failed = true;
      }
    });
  }

}
