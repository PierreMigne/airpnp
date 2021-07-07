import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  getPath(): boolean {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if (path === 'signup' || path === 'signin' || path === 'home') {
      return true;
    }
  }

}
