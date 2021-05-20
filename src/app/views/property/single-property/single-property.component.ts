import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';


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
  urlServer = environment.urlServer + 'properties/uploads/';

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.params.id;

    if (this.router.url.split('/').includes('my-properties')) {
      this.ownOrNotProperties = true;
    }

    this.propertySubscription = this.propertyService.getPropertyFromServer(id).subscribe(
      (property: Property) => {
        this.property = property;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error.message));
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        this.loading = false;
      }
    );
  }

  onBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }
}
