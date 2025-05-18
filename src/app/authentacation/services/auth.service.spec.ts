import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should start with not logged in', () => {
    expect(service.getUserLogged()).toBeFalse();
    expect(service.getAuthSubject().value).toBeFalse();
  });

  it('should log in with correct credentials', () => {
    service.login('admin', '1234');

    const token = localStorage.getItem('token');
    const authState = service.getAuthSubject().value;

    expect(token).toBe('mayar1234567890');
    expect(authState).toBeTrue();
    expect(service.getUserLogged()).toBeTrue();
  });

  it('should not log in with wrong credentials', () => {
    service.login('user', 'wrongpass');

    const token = localStorage.getItem('token');
    const authState = service.getAuthSubject().value;

    expect(token).toBeNull();
    expect(authState).toBeFalse();
    expect(service.getUserLogged()).toBeFalse();
  });

  it('should log out correctly', () => {
    service.login('admin', '1234');
    service.logout();

    const token = localStorage.getItem('token');
    const authState = service.getAuthSubject().value;

    expect(token).toBeNull();
    expect(authState).toBeFalse();
    expect(service.getUserLogged()).toBeFalse();
  });
});
