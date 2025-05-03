import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  isUserLogged!: Boolean;

  constructor(private userAuth: AuthService, private router: Router) {
    //this.isUserLogged = this.userAuth.getUserLogged();
  }
  ngOnInit(): void {
    this.userAuth.getAuthSubject().subscribe({
      next: (status) => {
        this.isUserLogged = status;
      },
    });
  }

  login(): void {
    this.userAuth.login(this.username, this.password);
    if (this.isUserLogged) {
      this.router.navigate(['']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
