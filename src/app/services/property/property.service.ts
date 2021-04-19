import { Property } from './../../models/property.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  properties: ReplaySubject<Array<Property>>;
  property: ReplaySubject<Property>;
  // private allPropertiesUrl = 'http://localhost:3000/properties/all';
  // private propertiesUrl = 'http://localhost:3000/properties';

  constructor(private httpClient: HttpClient) {
    this.properties = new ReplaySubject<Array<Property>>();
    this.property = new ReplaySubject<Property>();
  }

  getPropertiesFromServer(url): Subscription {
    return this.httpClient
      .get<Property[]>(url)
      .subscribe(
        (properties: Array<Property>) => {
          this.properties.next(properties);
        },
        (error) => {
          console.log('Erreur ! : ' + JSON.stringify(error.error));
        }
      );
  }

  getPropertyFromServer(url): Subscription {
    return this.httpClient
      .get<Property>(url)
      .subscribe(
        (property: Property) => {
          this.property.next(property);
        },
        (error) => {
          console.log('Erreur ! : ' + JSON.stringify(error.error));
        }
      );
  }
}
