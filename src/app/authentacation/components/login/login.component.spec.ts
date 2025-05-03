import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      getAuthSubject: () => of(true),
      login: jasmine.createSpy('login'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with empty username and password', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  it('should show error if login fails', () => {
    component.username = 'wrong';
    component.password = 'wrong';
    component.isUserLogged = false;

    component.login();

    expect(component.error).toBe('Invalid username or password');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate if login succeeds', () => {
    component.username = 'admin';
    component.password = '1234';
    component.isUserLogged = true;

    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call AuthService login', () => {
    component.username = 'admin';
    component.password = '1234';
    component.login();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin', '1234');
  });
});
