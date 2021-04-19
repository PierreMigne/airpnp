import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
  }

  getPath() {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if (path === 'signup' || path === 'signin') {
      return true;
    }
  }

}
