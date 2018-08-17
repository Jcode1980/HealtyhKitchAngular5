import { IAction } from './../../../models/IAction';
import { UsersActionTypes } from './../action-types/UsersActionTypes';
import {IUser} from '../../../models/IUser';

export class UserLoaded implements IAction {
  public type: string = UsersActionTypes.USER_LOADED;
  constructor (public payload?: IUser) {}
}

export class UserChange implements IAction {
  public type: string = UsersActionTypes.USER_CHANGE;
  constructor (public payload?: IUser) {}
}
