import { Property } from 'src/app/models/property.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite.model';
import { Booking } from '../../models/booking.model';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  urlServer = environment.urlServer + 'properties';
  url: string;
  properties: Subject<Array<Property>>;
  property: Subject<Property>;

  location: string;
  category: any;
  peoples: number;
  options: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.properties = new Subject<Property[]>();
    this.property = new Subject<Property>();
  }

  getPropertiesFromServer(): Observable<Property[]> {
    const categoryList = this.category ? this.category.map((category: string, index: number) => {
      return 'category[' + index + ']=' + category; // category[0]=MAISON&category[1]=VILLA...
    }).join('&') : null;

    const optionsList = this.options ? this.options.map((options: any, index: number) => {
      return 'options[' + index + ']=' + options; // options[0]=wifi&options[1]=pisicne...
    }).join('&') : null;

    let url = this.urlServer;

    if (!this.router.url.includes('my-properties')) {
      url += '/all';
    }

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

    return this.httpClient.get<Property[]>(url);
  }

  getPropertyFromServer(id: number): Observable<Property> {
    if (this.router.url.split('/').includes('my-properties')) {
      return this.httpClient.get<Property>(this.urlServer + '/' + id);
    } else {
      return this.httpClient.get<Property>(this.urlServer + '/all/' + id);
    }
  }

  getFavorites(): Observable<Favorite[]> {
    return this.httpClient.get<Favorite[]>(this.urlServer + '/favorites');
  }

  getBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.urlServer + '/bookings');
  }

  getBookingsById(id: number): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.urlServer + '/bookings/' + id);
  }

  // getFavoriteByPropertyIdAndUser(propertyId: number): Observable<Favorite> {
  //   return this.httpClient.get<Favorite>(this.urlServer + '/' +  propertyId + '/favorite');
  // }

  editProperty(
    id: number,
    property: Property,
    ): Observable<Property> {
    return this.httpClient.put<Property>(this.urlServer + '/' + id, {...property});
  }

  createProperty(
    property: Property,
    ): Observable<Property> {
      return this.httpClient.post<Property>(this.urlServer, {...property});
  }

  createFavorite(
    id: number,
    ): Observable<Favorite> {
    return this.httpClient.post<Favorite>(this.urlServer + '/' + id + '/favorite', null);
  }

  createBooking(
    id: number,
    booking: Booking
    ): Observable<Booking> {
    return this.httpClient.post<Booking>(this.urlServer + '/' + id + '/booking', {...booking});
  }

  deleteProperty(id: number): Observable<Property[]> {
    return this.httpClient.delete<Property[]>(this.urlServer + '/' + id);
  }

  deleteFavorite(favoriteId: number): Observable<Favorite[]> {
    return this.httpClient.delete<Favorite[]>(this.urlServer + '/favorites/' + favoriteId);
  }

  deleteFavoriteByPropertyIdAndUser(propertyId: number): Observable<Favorite> {
    return this.httpClient.delete<Favorite>(this.urlServer + '/favorite/' + propertyId);
  }
}
