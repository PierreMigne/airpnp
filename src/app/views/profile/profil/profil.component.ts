import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  loading: boolean;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;

    this.userService.getUserFromServer().subscribe(
      (user: User) => {
        this.userService.user.next(user);
        this.user = user;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }



  onEditProfile() {

  }
}
