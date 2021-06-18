import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = false;
  isAdminSubscription: Subscription;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onGetIsAuth(): boolean {
    return this.authService.getIsAuth();
  }

  isUserAdmin(): void {
    this.userService.isUserAdmin().subscribe(
     (isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.isAdminSubscription.unsubscribe();
  }

}
