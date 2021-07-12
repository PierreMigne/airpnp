import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  urlServer = environment.urlServer + 'auth';
  constructor(private httpClient: HttpClient) {
    this.getUserFromLocal()
  }

  getUserFromServer(): Observable<User> {
    return this.httpClient.get<User>(this.urlServer + '/profile');
  }

  getAllUsersFromServer(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.urlServer + '/all');
  }

  getAllUsersAndAdminsFromServer(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.urlServer + '/allUsersAndAdmins');
  }

  editUser(firstname: string, lastname: string, birthDate: Date): Observable<User> {
    return this.httpClient.put<User>(this.urlServer + '/profile/edit', {firstname, lastname, birthDate});
  }

  editUserRole(userId: number, role: string): Observable<User> {
    return this.httpClient.put<User>(this.urlServer + '/all/' + userId + '/role', {role});
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

  isUserSuperAdmin(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.urlServer + '/superAdmin');
  }

  countAdminsFromServers(): Observable<number> {
    return this.httpClient.get<number>(this.urlServer + '/admin/count');
  }

  getUserFromLocal(): any {
    if (localStorage.getItem('user') !==  null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      return this.user;
    }
  }

}
