import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {

  menuOpened = false;

  constructor() {
  }

  ngOnInit() {
  }

  onOpen(e) {
    console.log(this.menuOpened);
    this.menuOpened = !this.menuOpened;
  }

}
