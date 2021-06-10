import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAdmin = await this.userService.isUserAdmin().toPromise();
    if (isAdmin) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}

