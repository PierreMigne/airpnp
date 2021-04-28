import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property/property.service';

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

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.location = history.state.location; // Methods to have the location data from HomeComponent
    this.category = history.state.category; // Methods to have the category from HomeComponent
    this.peoples = history.state.peoples; // Methods to have the peoples from HomeComponent
    this.options = history.state.options; // Methods to have the options from HomeComponent

    const categoryList = this.category ? this.category.map((category: string, index: number) => {
      return 'category[' + index + ']=' + category; // category[0]=MAISON&category[1]=VILLA...
    }).join('&') : null;

    const optionsList = this.options ? this.options.map((options: any, index: number) => {
      return 'options[' + index + ']=' + options; // options[0]=wifi&options[1]=pisicne...
    }).join('&') : null;

    let url = 'http://localhost:3000/properties/all';
    if (this.category || this.location || this.peoples  || this.options) {
      url += '?';
    }
    if (this.category) {
      url += categoryList;
    }
    if (this.location) {
      url += `&location=${this.location}`;
    }
    if (this.peoples) {
      url += `&peoples=${this.peoples}`;
    }
    if (this.options) {
      url += `&${optionsList}`;
    }

    this.propertiesSubscription = this.propertyService.getPropertiesFromServer(url).subscribe(
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
