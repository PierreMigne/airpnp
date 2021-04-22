import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  loading: boolean;
  user: User;
  userSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;

    this.userSubscription = this.userService.getUserFromServer().subscribe(
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


  onEditProfile(): void {
    this.router.navigate(['profile', 'edit']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
