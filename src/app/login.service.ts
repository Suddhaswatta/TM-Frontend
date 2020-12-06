import { CommService } from './comm.service';
import { IUSER } from './iuser';
import { User } from './user';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, shareReplay, tap} from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private com: CommService) { }

  baseurl = environment.SERVER_URL;

  private isLoggedInSubject$ = new BehaviorSubject(this.hasToken());


  isUserLoggedIn(): Observable<boolean>{
    return this.isLoggedInSubject$.asObservable();
  }

  private hasToken(){
    return !!sessionStorage.getItem('token');
  }

  logout$(): Observable<any>{
    console.log(this.baseurl + 'logout');

    return this.http.get(this.baseurl + 'logout').pipe(
      map(
        () => {

          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          this.isLoggedInSubject$.next(false);
          return true;
        }), shareReplay()
    );
  }
  login$(username, password): Observable<IUSER>{

  const headers = this.createBasicAuthHeader(username, password);
  const auth = { Authorization: 'Basic ' + btoa(username + ':' + password) };
  return this.http.get<IUSER>(`${this.baseurl}user/login`, {headers}).pipe(

    map( (user: IUSER) => {

      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', JSON.stringify(auth));
      this.isLoggedInSubject$.next(true);
      return user;
    }),
    shareReplay()
  );

  }

  register$(object): Observable<IUSER>{

    const data = { firstname: object.firstname,
                  lastname: object.lastname,
                  username: object.id,
                  password: object.password
                  };
    if (object.role === 'admin'){

        return this.http.post(this.baseurl + 'user/registerAdmin', data ).pipe(

          map((user: User) => {
            return user;
          }

          )
        );
    }
    else{
      return this.http.post(this.baseurl + 'user/registerUser', data).pipe(

        map( (user: User) => {
          return user;
        }

        )

      );
    }



  }

  createBasicAuthHeader(username, password){

    const auth = { Authorization: 'Basic ' + btoa(username + ':' + password) };
    const headers = new HttpHeaders(auth);
    return headers;

  }
}
