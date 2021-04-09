import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  // signIn(email: string, password: string) {
  //   return this.httpClient
  //     .post<{accessToken: string}>('http://localhost:3000/auth/signin', {email, password})
  //     .subscribe(
  //       (res) => {
  //         if (res.accessToken) {
  //           localStorage.setItem('accessToken', res.accessToken);
  //          // this.router.navigateByUrl('/home');
  //         } else {
  //           this.router.navigate(['/signup']);
  //         }
  //       },
  //       (error) => {
  //         console.log('Erreur ! : ' + JSON.stringify(error));
  //       }
  //     );
  // }

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

  loggedIn(): boolean {
    return localStorage.getItem('accessToken') !==  null;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/home');
  }
}
