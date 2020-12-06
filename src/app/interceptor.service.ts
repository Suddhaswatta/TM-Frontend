import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

  console.log(`User : ${sessionStorage.getItem('user')}`);

    if (sessionStorage.getItem('user') === null) {
               return next.handle(request);
            }
    request =
    request.clone({

      setHeaders: JSON.parse(sessionStorage.getItem('token'))

  });
    return next.handle(request);
  }


}
