import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
}
