import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPropertiesComponent } from './all-properties.component';

describe('AllPropertiesComponent', () => {
  let component: AllPropertiesComponent;
  let fixture: ComponentFixture<AllPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
