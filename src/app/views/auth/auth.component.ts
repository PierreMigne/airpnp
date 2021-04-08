import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email = 'pierre@hotmail.fr';
  password = 'Admin123';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signIn(this.email, this.password);
    // this.authService.signUp(this.email, this.password);
  }

  onLogout() {
    this.authService.logout();
  }

}
