import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { User} from '../../../models/User';
import { IAppState } from '../../store/IAppState';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  loggedInUser: Observable<User>;
  @Output() changeSideViewEvent: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<IAppState>, private userService: UserService) { 
    this.loggedInUser = store.select("loggedInUser");
  }

  ngOnInit() {
  
  }

  logout(){
    this.userService.signout();
   }
 
   hideMe() {
     this.changeSideViewEvent.emit();
     //next is used when you don't have to pass through an event??
     //this.menuOpened.next();
   }
 

 



}
