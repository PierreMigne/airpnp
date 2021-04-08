import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  properties: Array<Property> = [];
  propertiesSubject = new Subject<any[]>();
  private propertiesUrl = 'http://localhost:3000/properties/all'; // DELETE ALL TO HAVE PROPERTIES BY USER

  constructor(private httpClient: HttpClient) {}

  getPropertiesFromServer() {
    this.httpClient
      .get<any[]>(this.propertiesUrl)
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
