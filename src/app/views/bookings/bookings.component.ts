import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { PropertyService } from '../../services/property/property.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, OnDestroy {

  bookings: Array<Booking>;
  bookingsSubscription: Subscription;

  pageSlice: Array<Booking>;
  loading: boolean;
  // urlServer = environment.urlServer + 'properties/uploads/';
  displayedColumns: string[] = ['dates', 'peoples', 'price', 'createdAt', 'propertyId'];
  dataSource: MatTableDataSource<Booking>;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookingsSubscription = this.propertyService.getBookings().subscribe(
      (bookings: Array<Booking>) => {
        this.bookings = bookings;
        this.pageSlice = this.bookings.slice(0, 5);
        this.dataSource = new MatTableDataSource<Booking>(this.pageSlice);

        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  OnPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.bookings.length) {
      endIndex = this.bookings.length;
    }
    this.pageSlice = this.bookings.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<Booking>(this.pageSlice);
  }

  ngOnDestroy(): void {
    this.bookingsSubscription.unsubscribe();
  }


}
