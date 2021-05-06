import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  errorMsg: string;
  categoryList: string[] = ['MAISON', 'VILLA', 'APPARTEMENT'];
  propertiesSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.propertiesSearchForm = this.formBuilder.group({
      location: [''],
      category: [''],
      peoples: [''],
      options: [''],
    });
  }

  onSubmitPropertiesSearchForm(): void {
    this.errorMsg = null;
    const location = this.propertiesSearchForm.get('location').value;
    const category = this.propertiesSearchForm.get('category').value;
    const peoples = this.propertiesSearchForm.get('peoples').value;
    const options = this.propertiesSearchForm.get('options').value ?
                    this.propertiesSearchForm.get('options').value.replace(' ', '').replace(',', ' ').split(' ')
                    : null;

    this.router.navigateByUrl('/properties', { state: { location, category , peoples, options } });
  }
}
