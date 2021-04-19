import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onGetIsAuth(): boolean {
    return this.authService.getIsAuth();
  }

  onLogout() {
    this.authService.logout();
  }

}
