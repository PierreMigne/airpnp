import { Property } from './../../../models/property.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyService } from '../../../services/property/property.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit, OnDestroy {

  loading: boolean;
  url: string;

  property: Property;
  propertySubscription: Subscription;

  editProperty: Property;
  editPropertySubscription: Subscription;

  editPropertyForm: FormGroup;
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories = ['VILLA', 'MAISON', 'APPARTEMENT'];
    this.loading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.url = 'http://localhost:3000/properties/' + id;

    this.propertySubscription = this.propertyService.getPropertyFromServer(this.url).subscribe(
      (property: Property) => {
        this.propertyService.property.next(property);
        this.property = property;
        this.loading = false;
        const index = this.categories.indexOf(this.property.category);

        this.editPropertyForm.patchValue({
          title: this.property.title,
          category: this.categories[index],
          location: this.property.location,
          surface: this.property.surface,
          peoples: this.property.peoples,
          beds: this.property.beds,
          description: this.property.description,
          options: this.property.options,
          price: this.property.price,
          photos: this.property.photos,
        });
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.errorMsg = error;
        this.loading = false;
      }
    );

    this.initForm();
  }

  initForm(): void {
    this.editPropertyForm = this.formBuilder.group({
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

  onSubmitEditPropertyForm(): void {
    this.errorMsg = null;
    this.title = this.editPropertyForm.get('title').value;
    this.category = this.editPropertyForm.get('category').value;
    this.location = this.editPropertyForm.get('location').value;
    this.surface = this.editPropertyForm.get('surface').value;
    this.peoples = this.editPropertyForm.get('peoples').value;
    this.beds = this.editPropertyForm.get('beds').value;
    this.description = this.editPropertyForm.get('description').value;
    this.options = this.editPropertyForm.get('options').value;
    this.price = this.editPropertyForm.get('price').value;
    this.photos = this.editPropertyForm.get('photos').value;

    this.editPropertySubscription = this.propertyService
      .editProperty(
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
        this.editProperty = property;
        this.onBack();
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
        if (this.editPropertyForm.controls.title.hasError('required')) {
          return 'Le titre est requis.';
        }
        break
      ;
      case 'location':
        if (this.editPropertyForm.controls.location.hasError('required')) {
          return 'Le lieu est requis.';
        }
        break
      ;
      case 'surface':
        if (this.editPropertyForm.controls.surface.hasError('required')) {
          return 'La surface est requise.';
        }
        break
      ;
      case 'peoples':
        if (this.editPropertyForm.controls.peoples.hasError('required')) {
          return 'Le nombre de personnes est requis.';
        }
        break
      ;
      case 'beds':
        if (this.editPropertyForm.controls.beds.hasError('required')) {
          return 'Le nombre de lits est requis.';
        }
        break
      ;
      case 'price':
        if (this.editPropertyForm.controls.price.hasError('required')) {
          return 'Le prix est requis.';
        }
        break
      ;
      case 'description':
        if (this.editPropertyForm.controls.description.hasError('required')) {
          return 'La description est requise.';
        }
        break
      ;
      case 'photos':
        if (this.editPropertyForm.controls.photos.hasError('required')) {
          return 'La photo est requise.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }

  onBack(): void {
    this.router.navigate(['my-properties']);
  }

  ngOnDestroy(): void {
    if (this.editPropertySubscription) {
      this.editPropertySubscription.unsubscribe();
    }
    this.propertySubscription.unsubscribe();
  }

}
