import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from '../../../services/property/property.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  nbProperty: number;
  nbPropertiesSubscription: Subscription;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.nbPropertiesSubscription = this.propertyService.countWaitingValidationPropertiesFromServers().subscribe(
      (properties: number) => {
        this.nbProperty = properties;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
      }
    );
  }

  ngOnDestroy(): void {
    this.nbPropertiesSubscription.unsubscribe();
  }

}
