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

  getPropertiesFromServer(url): Observable<Property[]> {
    return this.httpClient.get<Property[]>(url);
  }

  getPropertyFromServer(url): Observable<Property> {
    return this.httpClient.get<Property>(url);
  }
}
