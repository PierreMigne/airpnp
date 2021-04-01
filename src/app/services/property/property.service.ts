import { Injectable } from '@angular/core';
import { Property } from 'src/app/models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  properties: Array<Property>;

  constructor() {
    this.properties = [];
    const property = new Property(
      'Belle villa méditerranéenne',
      'Maison',
      180,
      5,
      'Petite maison de campagne.',
      180000,
      false,
      'assets/img/house.jpg'
    );
    this.properties.push(property);
    this.properties.push(property);
    this.properties.push(property);
    this.properties.push(property);
    this.properties.push(property);
  }
}
