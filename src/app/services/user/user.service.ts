import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlServer = environment.urlServer + 'auth';
  constructor(private httpClient: HttpClient) {
  }

  getUserFromServer(): Observable<User> {
    return this.httpClient.get<User>(this.urlServer + '/profile');
  }

  editUser(firstname: string, lastname: string, birthDate: Date): Observable<User> {
    return this.httpClient.put<User>(this.urlServer + '/profile/edit', {firstname, lastname, birthDate});
  }

  editPassword(oldPassword: string, password: string): Observable<User> {
    return this.httpClient.put<User>(this.urlServer + '/profile/edit/password', {oldPassword, password});
  }

  resetPassword(accessToken: string, password: string): Observable<User> {
    return this.httpClient.put<User>(this.urlServer + '/profile/reset/password', {accessToken, password});
  }

  isUserAdmin(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.urlServer + '/admin');
  }
}
