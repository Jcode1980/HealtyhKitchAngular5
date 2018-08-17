import {IAuth} from './IAuth';
import {IUser} from './IUser';

export interface IAppState {
  authReducer: IAuth;
  userReducer: IUser;
}
