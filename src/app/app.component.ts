import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'airpnp';
  isAdmin = false;
  isAdminSubscription: Subscription;

  constructor(private location: Location, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  getPath(): boolean {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if (path === 'signup' || path === 'signin') {
      return true;
    }
  }

  isUserAdmin(): void {
    if (this.authService.getIsAuth()) {
      this.userService.isUserAdmin().subscribe(
       (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }
  }

}
