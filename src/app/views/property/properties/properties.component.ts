import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from '../../../services/property/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, OnDestroy {

  properties: Array<Property>;
  propertiesSubscription: Subscription;

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.propertiesSubscription = this.propertyService.properties.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      }
    );
    this.propertyService.getPropertiesFromServer('http://localhost:3000/properties');
  }

  onShowProperty(propertyId: number): void {
    this.router.navigate(['properties', propertyId]);
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }

}
