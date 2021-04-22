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
  loading: boolean;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.params.id;
    this.propertySubscription = this.propertyService.getPropertyFromServer('http://localhost:3000/properties/all/' + id).subscribe(
      (property: Property) => {
        this.propertyService.property.next(property);
        this.property = property;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onReservation() {
    console.log('redirection vers la réservation');
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }
}
