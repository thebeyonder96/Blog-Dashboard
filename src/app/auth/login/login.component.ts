import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedStatus!: boolean;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.loggedStatus = this.authService.isLoggedStatus;
  }

  onSubmit(formValues: any) {
    this.authService.logIn(formValues.email, formValues.password);
  }
}
