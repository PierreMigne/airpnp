import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Property } from '../../../models/property.model';
import { PropertyService } from '../../../services/property/property.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-property-waiting-validation',
  templateUrl: './property-waiting-validation.component.html',
  styleUrls: ['./property-waiting-validation.component.scss']
})
export class PropertyWaitingValidationComponent implements OnInit, OnDestroy {

  properties: Array<Property>;
  propertiesSubscription: Subscription;

  pageSlice: Array<Property>;
  loading: boolean;
  // urlServer = environment.urlServer + 'properties/uploads/';
  displayedColumns: string[] = ['id', 'cat', 'isVisible', 'propertyId'];
  dataSource: MatTableDataSource<Property>;

  constructor(private propertyService: PropertyService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.loading = true;
    this.propertiesSubscription = this.propertyService.getWaitingValidationPropertiesFromServers().subscribe(
      (properties: Array<Property>) => {
        this.properties = properties;
        this.pageSlice = this.properties.slice(0, 5);
        this.dataSource = new MatTableDataSource<Property>(this.pageSlice);
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
    if (endIndex > this.properties.length) {
      endIndex = this.properties.length;
    }
    this.pageSlice = this.properties.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<Property>(this.pageSlice);
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }


}
