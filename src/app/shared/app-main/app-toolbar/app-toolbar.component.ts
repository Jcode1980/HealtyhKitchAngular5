import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  loginOpen = false;
  registerOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openRegister() {
    this.loginOpen = true;
    this.registerOpen = false;

  }

  openLogin() {
    this.registerOpen = true;
    this.loginOpen = false;
  }

  closeModals() {
    if (this.registerOpen || this.loginOpen) {
      this.registerOpen = false;
      this.loginOpen = false;
    }
  }


}
