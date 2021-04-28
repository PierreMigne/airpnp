import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;
  propertySubscription: Subscription;
  loading: boolean;
  ownOrNotProperties: boolean;
  url: string;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.loading = true;
    this.ownOrNotProperties = history.state.ownOrNotProperties; // Methods to have the ownOrNotProperties from PropertiesComponent
    const id = this.route.snapshot.params.id;
    if (this.ownOrNotProperties) {
      this.url = 'http://localhost:3000/properties/' + id;
    } else {
      this.url = 'http://localhost:3000/properties/all/' + id;
    }

    this.propertySubscription = this.propertyService.getPropertyFromServer(this.url).subscribe(
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

  onModification() {
    console.log('redirection vers la modification');
  }

  onBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }
}
