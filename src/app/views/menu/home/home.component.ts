import { Property } from 'src/app/models/property.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../../services/property/property.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  errorMsg: string;
  categoryList: string[] = ['MAISON', 'VILLA', 'APPARTEMENT'];
  propertiesSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.propertiesSearchForm = this.formBuilder.group({
      search: [''],
      category: [''],
      peoples: [''],
    });
  }

  onSubmitPropertiesSearchForm(): void {
    this.errorMsg = null;
    const search = this.propertiesSearchForm.get('search').value;
    const category = this.propertiesSearchForm.get('category').value;
    const peoples = this.propertiesSearchForm.get('peoples').value;
    // console.log(this.category);

    this.router.navigateByUrl('/properties', { state: { search, category , peoples } });

  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'firstname':
        if (this.propertiesSearchForm.controls.firstname.hasError('required')) {
          return 'Le prénom est requis.';
        }
        break
      ;
      case 'lastname':
        if (this.propertiesSearchForm.controls.lastname.hasError('required')) {
          return 'Le nom est requis.';
        }
        break
      ;
      case 'birthDate':
        if (this.propertiesSearchForm.controls.birthDate.hasError('required')) {
          return 'La date de naissance est requise.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }
}
