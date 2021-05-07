import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit, OnDestroy {

  property: Property;
  propertySubscription: Subscription;
  loading: boolean;
  ownOrNotProperties: boolean;
  urlServer = environment.urlServer;

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.params.id;

    if (this.router.url.split('/').includes('my-properties')) {
      this.ownOrNotProperties = true;
    }

    this.propertySubscription = this.propertyService.getPropertyFromServer(id).subscribe(
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

  // onReservation() {
  //   console.log('redirection vers la réservation');
  // }

  onBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }
}
