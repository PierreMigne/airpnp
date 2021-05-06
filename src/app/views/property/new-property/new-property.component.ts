import { Property } from 'src/app/models/property.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit, OnDestroy {

  loading: boolean;
  url: string;

  createProperty: Property;
  createPropertySubscription: Subscription;

  createPropertyForm: FormGroup;
  errorMsg: string;

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
  photos: string;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories = ['VILLA', 'MAISON', 'APPARTEMENT'];
    this.url = 'http://localhost:3000/properties/';

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
      photos: ['', [Validators.required]],
    });
  }

  onSubmitCreatePropertyForm(): void {
    this.errorMsg = null;
    this.title = this.createPropertyForm.get('title').value;
    this.category = this.createPropertyForm.get('category').value;
    this.location = this.createPropertyForm.get('location').value;
    this.surface = this.createPropertyForm.get('surface').value;
    this.peoples = this.createPropertyForm.get('peoples').value;
    this.beds = this.createPropertyForm.get('beds').value;
    this.description = this.createPropertyForm.get('description').value;
    this.options = this.createPropertyForm.get('options').value;
    this.price = this.createPropertyForm.get('price').value;
    this.photos = this.createPropertyForm.get('photos').value;

    this.createPropertySubscription = this.propertyService
      .createProperty(
        this.url,
        this.title,
        this.category,
        this.location,
        this.surface,
        this.peoples,
        this.beds,
        this.description,
        this.options,
        this.price,
        this.photos
      ).subscribe(
      (property: Property) => {
        this.propertyService.property.next(property);
        this.createProperty = property;
        this.router.navigate(['my-properties']);
      },
      (error) => {
        this.errorMsg = error;
        console.log('Erreur ! : ' + JSON.stringify(error.error));
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
