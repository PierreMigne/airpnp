import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property/property.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.scss']
})
export class AllPropertiesComponent implements OnInit, OnDestroy {

  properties: Array<Property>;
  propertiesSubscription: Subscription;
  loading: boolean;
  location: string;
  category: any;
  peoples: number;
  options: any;

  urlServer = environment.urlServer;

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.location = this.propertyService.location;
    this.category = this.propertyService.category;
    this.peoples = this.propertyService.peoples;
    this.options = this.propertyService.options;
    // this.location = history.state.location; // Methods to have the location data from HomeComponent
    // this.category = history.state.category; // Methods to have the category from HomeComponent
    // this.peoples = history.state.peoples; // Methods to have the peoples from HomeComponent
    // this.options = history.state.options; // Methods to have the options from HomeComponent



    this.propertiesSubscription = this.propertyService.getPropertiesFromServer().subscribe(
      (properties: Array<Property>) => {
        this.propertyService.properties.next(properties);
        this.properties = properties;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onShowProperty(propertyId: number): void {
    this.router.navigate(['properties', propertyId]);
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }

}
