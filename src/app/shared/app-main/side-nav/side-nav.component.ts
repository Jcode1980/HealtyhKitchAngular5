import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../user/user.service';
import {User} from '../../../../models/User';
import {Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store/IAppState';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  loggedInUser: Observable<User>;
  @Output() menuOpened: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<IAppState>, private userService: UserService) { 
    this.loggedInUser = store.select("loggedInUser");
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuOpened.emit();
  }



}
