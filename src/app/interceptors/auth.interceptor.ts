import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.auth.isLoggedIn && this.auth.user!=null){

      let newRequest= request.clone({
        params:request.params.append('auth',this.auth.user.idToken.toString())
      })
      
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
