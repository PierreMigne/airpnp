import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string;
  type: string;

  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.getPath();
    // this.authService.signIn(this.email, this.password);
    // this.authService.signUp(this.email, this.password);
  }

  getPath() {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if (path === 'signup') {
      this.title = 'INSCRIPTION';
      this.type = 'signup';
    } else if (path === 'signin') {
      this.title = 'CONNEXION';
      this.type = 'signin';
    }
  }

  onLogout() {
    this.authService.logout();
  }

}
