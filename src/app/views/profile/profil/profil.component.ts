import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  loading: boolean;
  user: User;
  userSubscription: Subscription;
  urlServer = environment.urlServer + 'auth/profile/uploads/';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;

    this.userSubscription = this.userService.getUserFromServer().subscribe(
      (user: User) => {
        this.user = user;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
