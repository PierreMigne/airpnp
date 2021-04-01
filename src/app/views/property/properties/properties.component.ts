import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from '../../../services/property/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: Array<Property>;

  constructor(private propertyService: PropertyService) {
    this.properties = [];
  }

  ngOnInit(): void {
    this.properties = this.propertyService.properties;
  }


}
