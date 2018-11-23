import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User} from '../../../../models/User';
import { IAppState } from '../../../store/IAppState';
import {UserService} from '../../../user/user.service';
import { IToken } from '../../../../models/IToken';
import {LogInUser, LogOutUser} from '../../../store/actions/currentuser.actions';

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {
  loggedInUser: Observable<User>;
  
  loginOpen = false;
  registerOpen = false;

   // Section 1
   tokens: Observable<IToken[]>;

  constructor(private store: Store<IAppState>, private userService: UserService) { 
    this.loggedInUser = store.select("loggedInUser");
    console.log("the store");
    console.log(store);

 
  }

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

  testLoginAction(){

    this.store.dispatch(new LogInUser(
      {
        email : "john@sqonk.com.au",
        firstName : "john",
        
        profileImageThumbnailID : 1,
        profileImagePreviewID : 2,
        yob : '19810',
        facebookURL : null,
        instagramURL : null,
        blogURL : null,
        websiteURL : null
      }
    ))
    console.log("the store after test login");
    console.log(this.store);
  }

  testLogoutAction(){
    this.store.dispatch(new LogOutUser());
    console.log("the store after test logout");
    console.log(this.store);
  }


}
