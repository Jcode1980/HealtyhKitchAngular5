import { IAction } from './../../../models/IAction';
import { UsersActionTypes } from './../action-types/UsersActionTypes';
import {User} from '../../../models/User';

export class UserLoaded implements IAction {
  public type: string = UsersActionTypes.USER_LOADED;
  constructor (public payload?: User) {}
}

export class UserChange implements IAction {
  public type: string = UsersActionTypes.USER_CHANGE;
  constructor (public payload?: User) {}
}
