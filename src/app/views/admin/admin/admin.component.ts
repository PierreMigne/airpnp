import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from '../../../services/property/property.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  nbProperty: number;
  nbPropertiesSubscription: Subscription;

  nbAdmin: number;
  nbAdminSubscription: Subscription;

  isUserSuperAdmin: boolean;
  isUserSuperAdminSubscription: Subscription;

  constructor(private propertyService: PropertyService, private userService: UserService) { }

  ngOnInit(): void {
    this.nbPropertiesSubscription = this.propertyService.countWaitingValidationPropertiesFromServers().subscribe(
      (properties: number) => {
        this.nbProperty = properties;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
      }
    );
    this.nbAdminSubscription = this.userService.countAdminsFromServers().subscribe(
      (admins: number) => {
        this.nbAdmin = admins;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
      }
    );
    this.isUserSuperAdminSubscription = this.userService.isUserSuperAdmin().subscribe(
      (isUserSuperAdmin: boolean) => {
        this.isUserSuperAdmin = isUserSuperAdmin;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
      }
    );
  }

  ngOnDestroy(): void {
    this.nbPropertiesSubscription.unsubscribe();
    this.nbAdminSubscription.unsubscribe();
    this.isUserSuperAdminSubscription.unsubscribe();
  }

}
