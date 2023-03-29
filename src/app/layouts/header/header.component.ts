import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  userEmail!: any;
  isLoggedIn$!:Observable<boolean>;

  constructor(private afAuth: AuthService) {}

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user')!).email;
    this.isLoggedIn$ = this.afAuth.isLogged();
  }

  isShow() {
    this.isOpen = !this.isOpen;
  }

  onLogout(): void {
    this.afAuth.logOut();
  }
}
