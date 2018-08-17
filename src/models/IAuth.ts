import {IUser} from './IUser';

export interface IAuth {
  authenticated: boolean;
  loaded: boolean;
  loading: boolean;
  user?: IUser;
  token: string;
}
