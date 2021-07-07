import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyWaitingValidationComponent } from './property-waiting-validation.component';

describe('PropertyWaitingValidationComponent', () => {
  let component: PropertyWaitingValidationComponent;
  let fixture: ComponentFixture<PropertyWaitingValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyWaitingValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyWaitingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
