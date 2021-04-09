import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from 'src/app/models/property.model';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  properties: Array<Property> = [];
  propertiesSubject = new Subject<Property[]>();
  private propertiesUrl = 'http://localhost:3000/properties/all'; // DELETE "ALL" TO HAVE PROPERTIES BY USER

  constructor(private httpClient: HttpClient) {}

  getPropertiesFromServer() {
    this.httpClient
      .get<Property[]>(this.propertiesUrl)
      .subscribe(
        (response) => {
          this.properties = response;
        },
        (error) => {
          console.log('Erreur ! : ' + JSON.stringify(error.error));
        }
      );
  }

  emitPropertiesSubject() {
    this.propertiesSubject.next(this.properties);
  }

}
