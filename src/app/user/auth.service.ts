import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }


  loginUser(userName: string, password: String) {

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const loginInfo = { username: userName, password: password };

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false); // create an observable of false
      }));
    // tap into the stream and take an action when data comes into the stream
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    // return the observable so that actions can be taken on arrival
    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);

  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  logout() {
    this.currentUser = undefined;

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  ;  return this.http.post('/api/logout', {}, options)
  ;}

  // why is best with tap and not with subscribe: latter if we want to return the observable the users of the method can actualy subscribe and take an action when the data comes back
  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data
  ;      }
      })).subscribe()
  ;}
}
