import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;
  propertySubscription: Subscription;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertySubscription = this.propertyService.property.subscribe(
      (property: Property) => {
        this.property = property;
      }
    );
    const id = this.route.snapshot.params.id;
    this.propertyService.getPropertyFromServer('http://localhost:3000/properties/all/' + id);
  }

  onReservation() {
    console.log('redirection vers la réservation');

  }


}
