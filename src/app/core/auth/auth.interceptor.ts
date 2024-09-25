import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config/url.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(BASE_URL.ANDBANK)) {
      const requestClone = request.clone({
        headers: request.headers
          .set('X-Test-Key', 'g63yQdq4hDT9Qz65Q8h9b')
      });

      return next.handle(requestClone);
    }

    return next.handle(request);
  }
}