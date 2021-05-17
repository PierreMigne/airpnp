import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private httpClient: HttpClient) {
  }

  getUserFromServer(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:3000/auth/profile');
  }

  editUser(firstname: string, lastname: string, birthDate: Date): Observable<User> {
    return this.httpClient.put<User>('http://localhost:3000/auth/profile/edit', {firstname, lastname, birthDate});
  }

  editPassword(oldPassword: string, password: string): Observable<User> {
    return this.httpClient.put<User>('http://localhost:3000/auth/profile/edit/password', {oldPassword, password});
  }
}
