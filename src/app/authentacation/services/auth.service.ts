import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject: BehaviorSubject<Boolean>;
  constructor() {
    this.authSubject = new BehaviorSubject<Boolean>(false);
  }
  login(username: string, password: string) {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('token', 'mayar1234567890');
      this.authSubject.next(true);
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
  getUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  getAuthSubject(): BehaviorSubject<Boolean> {
    return this.authSubject;
  }
}
