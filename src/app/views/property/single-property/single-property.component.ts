import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/fr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Booking } from '../../../models/booking.model';
import { MatDialog } from '@angular/material/dialog';
import { GrowImgDialogComponent } from '../../../components/dialog/grow-img-dialog/grow-img-dialog.component';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
import { AuthService } from '../../../services/auth/auth.service';
SwiperCore.use([Pagination, Navigation, Autoplay ]);

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit, OnDestroy {

  urlServer = environment.urlServer + 'properties/uploads/';
  urlServerProfile = environment.urlServer + 'properties/uploads/profile/';
  id: number;
  property: Property;
  propertySubscription: Subscription;
  loading: boolean;
  booking: any;
  isAdmin: boolean;
  isConnected: boolean;
  isReject: boolean;

  rejectPropertyForm: FormGroup;
  reasons: string[];
  resaForm: FormGroup;
  peoples: Array<number>;

  startDate: Moment;
  endDate: Moment;
  chosenDates: string;

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.params.id;
    this.isConnected = this.authService.getIsAuth();
    this.isReject = false;

    if (this.router.url.split('/').includes('not-visible')) {
      this.isAdmin = true;
    }

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
    this.initForm();
  }

  initForm(): void {
    this.resaForm = this.formBuilder.group({
      peoples: ['', [Validators.required]],
      startDate: new FormControl({value: this.startDate, disabled: true}, Validators.required),
      endDate: new FormControl({value: this.endDate, disabled: true}, Validators.required),
    });
  }

  getSelectedDates(selectedDates): void {
    this.startDate = selectedDates.startDate;
    this.endDate = selectedDates.endDate;
    this.chosenDates = selectedDates.chosenLabel;
  }

  onBack(): void {
    this.location.back();
  }

  onSubmitResaForm(): void {
    const startDate = new Date(moment(this.startDate).format('YYYY-MM-DD'));
    const endDate = new Date(moment(this.endDate).format('YYYY-MM-DD'));
    const peoples = this.resaForm.get('peoples').value;
    const nbNightInReservation = moment.duration(moment(endDate).diff(startDate)).asDays();
    const price = this.property.price * nbNightInReservation;
    this.booking = {startDate , endDate, price, peoples};
    if (nbNightInReservation === 0) {
      this.snackbarService.alertSnackbar('Vous devez s??lectionner au moins 2 jours.');
      throw new Error('2 days min required.');
    } else {
      this.onCreateBooking(this.id);
    }
  }

  onCreateBooking(propertyId: number): any {
    this.loading = true;
    this.propertyService.createBooking(propertyId, this.booking).subscribe(
      () => {
        this.loading = false;
        this.snackbarService.successSnackbar('R??servation effectu??e avec succ??s.');
      },
      (error) => {
        this.loading = false;
        console.log('Erreur ! : ' + JSON.stringify(error.error.message));
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
      }
    );
  }

  growImages(event: any): void {
    const src = event.path[0].src;
    this.dialog.open(GrowImgDialogComponent, {
      data: {
        img: src
      }
    });
  }

  onValidateProperty(): void {
    this.loading = true;
    const status = 'VALIDE';
    this.propertyService.editPropertyStatus(this.id, status).subscribe(
      () => {
        this.snackbarService.successSnackbar('H??bergement valid?? avec succ??s.');
        this.router.navigate(['admin', 'validation']);
        this.loading = false;
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onRejectProperty(): void {
    this.isReject = true;
    this.reasons = ['Image inappropri??e', 'Titre incorrect', 'Description incorrecte', 'Options incorrectes', 'Lieu inconnu', 'Tarif incorrect', 'Capacit?? d\'h??bergement incorrect', 'Erreur sur l\'annonce'];
    this.rejectPropertyForm = this.formBuilder.group({
      reason: ['', [Validators.required]]
    });

  }

  onSubmitRejectPropertyForm(): void {
    this.loading = true;
    const status = 'INVALIDE';
    const reasons = this.rejectPropertyForm.get('reason').value;
    this.propertyService.editPropertyStatus(this.id, status, reasons).subscribe(
      () => {
        this.snackbarService.successSnackbar('H??bergement refus?? avec succ??s.');
        this.router.navigate(['admin', 'validation']);
        this.loading = false;
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }


  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }

}
