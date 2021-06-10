import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grow-img-dialog',
  templateUrl: './grow-img-dialog.component.html',
  styleUrls: ['./grow-img-dialog.component.scss']
})
export class GrowImgDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
