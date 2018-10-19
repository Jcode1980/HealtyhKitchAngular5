import {IAuth} from './IAuth';
//import {IUser} from './IUser';
import {User} from './User';

export interface IAppState {
  authReducer: IAuth;
  userReducer: User;
}
