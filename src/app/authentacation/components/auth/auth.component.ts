import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isUserLogged: boolean;
  constructor(private userAuth: AuthService, private router: Router) {
    this.isUserLogged = this.userAuth.getUserLogged();
  }
  login() {
    this.router.navigate(['login']);
  }
  logout() {
    this.userAuth.logout();
    this.isUserLogged = this.userAuth.getUserLogged();
  }
}
