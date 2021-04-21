import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Subject<User>;

  constructor(private httpClient: HttpClient) {
    this.user = new Subject<User>();
  }

  getUserFromServer(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:3000/auth/profile');
  }
}
