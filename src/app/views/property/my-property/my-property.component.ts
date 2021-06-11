import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { GrowImgDialogComponent } from '../../../components/dialog/grow-img-dialog/grow-img-dialog.component';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
import { AuthService } from '../../../services/auth/auth.service';
SwiperCore.use([Pagination, Navigation, Autoplay ]);

@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.scss']
})
export class MyPropertyComponent implements OnInit, OnDestroy {

  urlServer = environment.urlServer + 'properties/uploads/';
  id: number;
  property: Property;
  propertySubscription: Subscription;
  loading: boolean;

  peoples: Array<number>;

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.params.id;

    // if (this.router.url.split('/').includes('not-visible')) {
    //   this.isAdmin = true;
    // }

    this.propertySubscription = this.propertyService.getPropertyFromServer(this.id).subscribe(
      (property: Property) => {
        this.property = property;
        this.peoples = Array.from({length: property.peoples}, (_, i) => i + 1);
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

  growImages(event: any): void {
    const src = event.path[0].src;
    this.dialog.open(GrowImgDialogComponent, {
      data: {
        img: src
      }
    });
  }

  // onValidateProperty(): void {
  //   const status = 'VALIDE';
  //   this.propertyService.editPropertyStatus(this.id, status).subscribe(
  //     () => {
  //       this.snackbarService.successSnackbar('Hébergement validé avec succès.');
  //       this.router.navigate(['admin', 'validation']);
  //     },
  //     (error) => {
  //       this.snackbarService.alertSnackbar('Une erreur est survenue.');
  //       console.log('Erreur ! : ' + JSON.stringify(error.error));
  //     }
  //   );
  // }

  // onRejectProperty(): void {
  //   const status = 'INVALIDE';
  //   this.propertyService.editPropertyStatus(this.id, status).subscribe(
  //     () => {
  //       this.snackbarService.successSnackbar('Hébergement refusé avec succès.');
  //       this.router.navigate(['admin', 'validation']);
  //     },
  //     (error) => {
  //       this.snackbarService.alertSnackbar('Une erreur est survenue.');
  //       console.log('Erreur ! : ' + JSON.stringify(error.error));
  //     }
  //   );
  // }


  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }

}
