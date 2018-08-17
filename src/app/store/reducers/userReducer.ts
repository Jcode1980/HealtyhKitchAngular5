import { UsersActionTypes } from './../action-types/UsersActionTypes';
import {IUser} from '../../../models/IUser';
import {IAction} from '../../../models/IAction';

const initialUser: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  avatarLink: null,
};

export function userReducer(state: IUser = initialUser, action: IAction): IUser {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case(UsersActionTypes.USER_LOADED): {
      newState = action.payload;
      return newState;
    }
    case (UsersActionTypes.USER_CHANGE): {
      newState = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
}
