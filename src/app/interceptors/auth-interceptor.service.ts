import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  let modifiedReq = req.clone({
    headers: req.headers.append('Authorization', 'mayar123456789'),
  });
  return next(modifiedReq);
}
