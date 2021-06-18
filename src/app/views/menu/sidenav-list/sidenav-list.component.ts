import { Component, OnInit, Output, EventEmitter, OnDestroy, OnChanges, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Input() item: boolean ;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  onGetIsAuth(): boolean {
    return this.authService.getIsAuth();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
