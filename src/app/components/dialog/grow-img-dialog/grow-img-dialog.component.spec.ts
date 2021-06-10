import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowImgDialogComponent } from './grow-img-dialog.component';

describe('GrowImgDialogComponent', () => {
  let component: GrowImgDialogComponent;
  let fixture: ComponentFixture<GrowImgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowImgDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
