import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = {email: 'pierre@hotmail.fr', password: 'Admin123'};

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signIn(email: string, password: string) {
    return this.httpClient
      .post<{accessToken: string}>('http://localhost:3000/auth/signin', {email, password})
      .subscribe(
        (res) => {
          if (res.accessToken) {
            console.log('Connecté !');
            localStorage.setItem('accessToken', res.accessToken);
           // this.router.navigateByUrl('/home');
          } else {
            this.router.navigateByUrl('/signup');
            console.log('Non Connecté !');
          }
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  signUp(email: string, password: string) {
    return this.httpClient
      .post<{accessToken: string}>('http://localhost:3000/auth/signup', {email, password})
      .subscribe(
        (res) => {
          this.signIn(email, password);
        },
        (error) => {
          console.log('Erreur ! : ' + JSON.stringify(error.error.message));
        }
      );
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('accessToken') !==  null;
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}
