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
      'Toulouse',
      180,
      5,
      3,
      'Petite maison de campagne.',
      ['wifi', 'parkging', 'piscine','wifi', 'parkging', 'piscine','wifi', 'parkging', 'piscine','wifi'],
      180,
      'assets/img/house.jpg'
    );
    this.properties.push(property);
    this.properties.push(property);
    this.properties.push(property);
    this.properties.push(property);
    this.properties.push(property);
  }
}
