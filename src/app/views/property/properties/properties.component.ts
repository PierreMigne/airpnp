import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from '../../../services/property/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: Array<Property>;

  constructor(private propertyService: PropertyService, private router: Router) {
    this.properties = [];
  }

  ngOnInit(): void {
    this.properties = this.propertyService.properties;
  }

  onShowProperty(propertyId: number) {
    this.router.navigate(['properties', propertyId]);
  }

}
