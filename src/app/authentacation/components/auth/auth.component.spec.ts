import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserLogged: jasmine.createSpy().and.returnValue(true),
      logout: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show Logout button when user is logged in', () => {
    component.isUserLogged = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent?.toLowerCase()).toContain('logout');
  });

  it('should navigate to login on login()', () => {
    component.login();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should call logout and update isUserLogged on logout()', () => {
    mockAuthService.getUserLogged.and.returnValue(false);

    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(component.isUserLogged).toBe(false);
  });
});
