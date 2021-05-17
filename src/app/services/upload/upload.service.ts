import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  urlServer = environment.urlServer;
  url: string;

  constructor(private httpClient: HttpClient) { }

  upload(propertiesOrProfile: string, id: number, formData: FormData): Observable<HttpEvent<FormData>> {
    if (propertiesOrProfile === 'profile') {
      this.url = `${this.urlServer}auth/${propertiesOrProfile}/${id}/uploads`;
    } else {
      this.url = `${this.urlServer}${propertiesOrProfile}/${id}/uploads`;
    }
    return this.httpClient.post<FormData>(this.url, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }
}
