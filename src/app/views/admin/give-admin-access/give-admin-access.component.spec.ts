import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAdminAccessComponent } from './give-admin-access.component';

describe('GiveAdminAccessComponent', () => {
  let component: GiveAdminAccessComponent;
  let fixture: ComponentFixture<GiveAdminAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveAdminAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveAdminAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
