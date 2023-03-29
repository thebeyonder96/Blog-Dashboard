import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedStatus:boolean=false;

  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastrService,
    private router: Router
  ) {}

  logIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        console.log(logRef);
        this.toast.success('Logged in Successfully');
        this.loadUser();
        this.isLoggedStatus = true;
        this.isLoggedIn.next(true);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toast.error(error);
      });
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.isLoggedIn.next(false)
        this.toast.success('User logged out successfully');
        this.isLoggedStatus = false;
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isLogged(){
    return this.isLoggedIn.asObservable();
  }
}
