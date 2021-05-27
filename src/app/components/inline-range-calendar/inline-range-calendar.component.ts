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
          this.reservation.push({startDate : moment(booking.startDate), endDate: moment(booking.endDate)});
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
    this.selected = event;
    this.selectedDates.emit(event);
  }

  isInvalidDate = (m: moment.Moment) => {
    let isValid = false;
    this.reservation.forEach(resa => {
      // Si la date tombe sur une des reservation alors elle est invalidée
      if (m.isBetween(resa.startDate, resa.endDate, 'D', '[)')) {
        isValid = true;
      }
    });
    return isValid;
  }

  ngOnDestroy(): void {
    this.bookingsSubscription.unsubscribe();
  }
}
