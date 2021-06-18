import { Property } from 'src/app/models/property.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { PropertyService } from 'src/app/services/property/property.service';
import { UploadService } from '../../../services/upload/upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit, OnDestroy {

  loading: boolean;

  createProperty: Property;
  createPropertySubscription: Subscription;

  createPropertyForm: FormGroup;

  categories: string[];
  title: string;
  category: string;
  location: string;
  surface: number;
  peoples: number;
  beds: number;
  description: string;
  options: string[];
  price: number;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.categories = ['VILLA', 'MAISON', 'APPARTEMENT'];
    this.initForm();
  }

  initForm(): void {
    this.createPropertyForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      peoples: ['', [Validators.required]],
      beds: ['', [Validators.required]],
      description: ['', [Validators.required]],
      options: [''],
      price: ['', [Validators.required]],
    });
  }

  onSubmitCreatePropertyForm(): void {
    this.createPropertySubscription = this.propertyService
      .createProperty((this.createPropertyForm.value as Property)).subscribe(
      (property: Property) => {
        this.createProperty = property;
        this.snackbarService.successSnackbarValidation('Votre hébergement sera disponible lorsqu\'un Administrateur aura validé votre annonce.');
        this.router.navigate(['my-properties', property.id, 'upload']);
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error.message));
      }
    );
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'title':
        if (this.createPropertyForm.controls.title.hasError('required')) {
          return 'Le titre est requis.';
        }
        break
      ;
      case 'location':
        if (this.createPropertyForm.controls.location.hasError('required')) {
          return 'Le lieu est requis.';
        }
        break
      ;
      case 'surface':
        if (this.createPropertyForm.controls.surface.hasError('required')) {
          return 'La surface est requise.';
        }
        break
      ;
      case 'peoples':
        if (this.createPropertyForm.controls.peoples.hasError('required')) {
          return 'Le nombre de personnes est requis.';
        }
        break
      ;
      case 'beds':
        if (this.createPropertyForm.controls.beds.hasError('required')) {
          return 'Le nombre de lits est requis.';
        }
        break
      ;
      case 'price':
        if (this.createPropertyForm.controls.price.hasError('required')) {
          return 'Le prix est requis.';
        }
        break
      ;
      case 'description':
        if (this.createPropertyForm.controls.description.hasError('required')) {
          return 'La description est requise.';
        }
        break
      ;
      case 'photos':
        if (this.createPropertyForm.controls.photos.hasError('required')) {
          return 'La photo est requise.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }

  ngOnDestroy(): void {
    if (this.createPropertySubscription) {
      this.createPropertySubscription.unsubscribe();
    }
  }


}
