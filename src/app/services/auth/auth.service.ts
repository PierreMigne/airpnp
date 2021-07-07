import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlServer = environment.urlServer + 'auth';

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
  }

  async signIn(email: string, password: string): Promise<any> {
    return await this.httpClient
      .post<{user: User, accessToken: string}>(this.urlServer + '/signin', {email, password})
      .toPromise()
      .then((res) => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.userService.user = res.user;
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigate(['/signup']);
        }
        Promise.resolve();
      })
      .catch((err) => {
        Promise.reject(err.error.message);
        return(err.error.message);
      })
    ;
  }

  async signUp(email: string, password: string, firstname: string, lastname: string, birthDate: Date): Promise<any> {
    return await this.httpClient
      .post<{accessToken: string}>(this.urlServer + '/signup', {email, password, firstname, lastname, birthDate})
      .toPromise()
      .then(() => {
        this.signIn(email, password);
        Promise.resolve();
      })
      .catch((err) => {
        Promise.reject(err.error.message);
        return(err.error.message);
      })
    ;
  }

  forgotPassword(email: string): Observable<{accessToken: string}> {
    return this.httpClient.post<{accessToken: string}>(this.urlServer + '/forgot', {email});
  }

  getIsAuth(): boolean {
    if (localStorage.getItem('accessToken') !==  null) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.userService.user = null;
    this.router.navigateByUrl('/home');
  }
}
