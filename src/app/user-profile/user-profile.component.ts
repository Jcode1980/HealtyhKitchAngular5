import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  currentUser() : User {
    return this.userService.authenticatedUser();
  }



}
