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
  search: string;
  category: any;
  peoples: number;
  url: string;

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.search = history.state.search; // Methods to have the search data from HomeComponent
    this.category = history.state.category; // Methods to have the category from HomeComponent
    this.peoples = history.state.peoples; // Methods to have the peoples from HomeComponent

    const categoryList = this.category ? this.category.map((category: string, index: number) => {
      return 'category[' + index + ']=' + category; // category[0]=MAISON&category[1]=VILLA...
    }).join('&') : null;

    this.url = 'http://localhost:3000/properties/all';
    if (this.category || this.search || this.peoples) {
      this.url += '?';
    }
    if (this.category) {
      this.url += categoryList;
    }
    if (this.search) {
      this.url += `&search=${this.search}`;
    }
    if (this.peoples) {
      this.url += `&peoples=${this.peoples}`;
    }

    this.propertiesSubscription = this.propertyService.getPropertiesFromServer(this.url).subscribe(
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
