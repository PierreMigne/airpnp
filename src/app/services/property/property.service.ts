import { Property } from 'src/app/models/property.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  properties: Subject<Array<Property>>;
  property: Subject<Property>;

  constructor(private httpClient: HttpClient) {
    this.properties = new Subject<Property[]>();
    this.property = new Subject<Property>();
  }

  getPropertiesFromServer(url: string): Observable<Property[]> {
    return this.httpClient.get<Property[]>(url);
  }

  getPropertyFromServer(url: string): Observable<Property> {
    return this.httpClient.get<Property>(url);
  }

  editProperty(
    url: string,
    title: string,
    category: string,
    location: string,
    surface: number,
    peoples: number,
    beds: number,
    description: string,
    options: string[],
    price: number,
    photos: string
    ): Observable<Property> {
    return this.httpClient.put<Property>(url, {title, category, location, surface, peoples, beds, description, options, price, photos});
  }
}
