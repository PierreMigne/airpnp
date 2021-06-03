import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string;
  type: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.getPath();
  }

  getPath() {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if (path === 'signup') {
      this.title = 'INSCRIPTION';
      this.type = 'signup';
    } else if (path === 'signin') {
      this.title = 'CONNEXION';
      this.type = 'signin';
    } else if (path === 'forgot') {
      this.title = 'Oubli de mot de passe';
      this.type = 'forgot';
    } else if (path.includes('reset') ) {
      this.title = 'Réinitialisation du mot de passe';
      this.type = 'reset';
    }
  }

}
