import { Property } from './../../../models/property.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyService } from '../../../services/property/property.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

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

  id: number;
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.categories = ['VILLA', 'MAISON', 'APPARTEMENT'];
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params.id;

    this.propertySubscription = this.propertyService.getPropertyFromServer(this.id).subscribe(
      (property: Property) => {
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
        });
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
    });
  }

  onSubmitEditPropertyForm(): void {
    this.editPropertySubscription = this.propertyService
      .editProperty(this.id, (this.editPropertyForm.value as Property)).subscribe(
      (property: Property) => {
        this.editProperty = property;
        this.snackbarService.successSnackbar('Hébergement modifié avec succès.');
        this.router.navigate(['my-properties']);
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

  ngOnDestroy(): void {
    if (this.editPropertySubscription) {
      this.editPropertySubscription.unsubscribe();
    }
    this.propertySubscription.unsubscribe();
  }

}
