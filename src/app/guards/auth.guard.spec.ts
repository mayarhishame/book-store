import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../authentacation/services/auth.service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const fakeRoute = {} as ActivatedRouteSnapshot;
  const fakeState = { url: '/fake' } as RouterStateSnapshot;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserLogged']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow the authenticated user to access the route', () => {
    mockAuthService.getUserLogged.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(fakeRoute, fakeState)
    );

    expect(result).toBeTrue();
    expect(mockAuthService.getUserLogged).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect unauthenticated user to /login', () => {
    mockAuthService.getUserLogged.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(fakeRoute, fakeState)
    );

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
