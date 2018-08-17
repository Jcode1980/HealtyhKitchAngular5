import {IAction} from '../../../models/IAction';
import {AuthActionTypes} from '../action-types/AuthActionTypes';

export class AuthenticateAction implements IAction {
  public type: string = AuthActionTypes.AUTHENTICATE;

  constructor (public payload?: {token: string}) {}
}

export class AuthenticatedAction implements IAction {
  public type: string = AuthActionTypes.AUTH_SUCCEEDED;

  constructor (public payload?: {token?: string}) {}
}

export class LogoutAction implements IAction {
  public type: string = AuthActionTypes.LOG_OUT;

  constructor () {}
}
