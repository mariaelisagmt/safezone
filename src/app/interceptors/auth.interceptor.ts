/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service'; // ajuste se necessário

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userService = inject(UserService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    console.log('Teste', token);
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
