import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // SERVER_URL = 'http://localhost:3000/properties/1/uploads';
  urlServer = environment.urlServer;

  constructor(private httpClient: HttpClient) { }

  upload(propertyId: number, formData: FormData): Observable<HttpEvent<FormData>> {
    return this.httpClient.post<FormData>(`${this.urlServer}properties/${propertyId}/uploads`, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }
}
