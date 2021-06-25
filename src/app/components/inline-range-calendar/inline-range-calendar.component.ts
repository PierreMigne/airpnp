import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/fr';
import { Subscription } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { PropertyService } from '../../services/property/property.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-inline-range-calendar',
  templateUrl: './inline-range-calendar.component.html',
  styleUrls: ['./inline-range-calendar.component.scss'],
})
export class InlineRangeCalendarComponent implements OnInit, OnDestroy {

  selected: { chosenLabel: string, startDate: Moment, endDate: Moment };
  startDate: Moment;
  endDate: Moment;
  minDay: Moment = moment();
  loading: boolean;
  bookings: Array<Booking> = [];
  bookingsSubscription: Subscription;
  @Input() propertyId: number;
  @Output() selectedDates = new EventEmitter<any>();

  reservation: [{startDate: Moment, endDate: Moment }];
  constructor(private propertyService: PropertyService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.bookingsSubscription = this.propertyService.getBookingsById(this.propertyId).subscribe(
      (bookings: Array<Booking>) => {
        this.bookings = bookings;
        this.loading = false;
        this.reservation = [{startDate : null, endDate: null }];
        this.bookings.forEach(booking => {

          // old reservation not needed
          if (moment(booking.startDate).isBefore(moment()) && moment(booking.endDate).isBefore(moment())) {
            return;
          } else {
            this.reservation.push({startDate : moment(booking.startDate), endDate: moment(booking.endDate)});
          }

        });
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );

  }

  choosedDate(event: any): void {
    this.startDate = event.startDate._d;
    this.endDate = event.endDate._d;
    if (moment(event.startDate).isSame(moment(event.endDate), 'day')) {
      this.snackbarService.alertSnackbar('Vous devez sélectionner au moins 2 jours.');
      throw new Error('2 days min required.');
    }
    this.selected = event;
    this.selectedDates.emit(event);
  }

  isInvalidDate = (m: moment.Moment) => {
    let isNotValid = false;
    this.reservation.forEach(resa => {
      // if the date is between start date and an end date of a reservation, she's not valid.
      if (m.isBetween(resa.startDate, resa.endDate, 'D', '[)')) {
        isNotValid = true;
      }
    });
    return isNotValid;
  }

  ngOnDestroy(): void {
    this.bookingsSubscription.unsubscribe();
  }
}
