import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `em {float:right; color:#E05C65; padding-left:10px}`
  ]
})
export class LoginComponent {
  username; // in prod mode the binding (ngModel)="username" is not defined
  password; // in prod mode the binding (ngModel)="password" is not defined
  mouseoverLogin; // same
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe(resp => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
