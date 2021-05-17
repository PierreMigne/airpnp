import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from '../../../services/property/property.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, OnDestroy {

  properties: Array<Property>;
  propertiesSubscription: Subscription;

  loading: boolean;
  urlServer = environment.urlServer + 'properties/uploads/';

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.propertiesSubscription = this.propertyService.getPropertiesFromServer().subscribe(
      (properties: Array<Property>) => {
        this.properties = properties;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onDeleteProperty(propertyId: number): void {
    this.loading = true;
    this.propertiesSubscription = this.propertyService.deleteProperty(propertyId).subscribe(
      (properties: Array<Property>) => {
        // this.propertyService.properties.next(properties);
        this.properties = properties;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }
}
