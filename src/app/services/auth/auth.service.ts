import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  async signIn(email: string, password: string): Promise<any> {
    return await this.httpClient
      .post<{accessToken: string}>('http://localhost:3000/auth/signin', {email, password})
      .toPromise()
      .then((res) => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
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
      .post<{accessToken: string}>('http://localhost:3000/auth/signup', {email, password, firstname, lastname, birthDate})
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

  getIsAuth(): boolean {
    if (localStorage.getItem('accessToken') !==  null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/home');
  }
}
