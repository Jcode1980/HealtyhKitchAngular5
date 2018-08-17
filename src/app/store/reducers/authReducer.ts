import {IAppState} from '../../../models/IAppState';
import {IAction} from '../../../models/IAction';
import {AuthActionTypes} from '../action-types/AuthActionTypes';
import {IAuth} from '../../../models/IAuth';

const authState: IAuth = {
  loaded: true,
  authenticated: false,
  loading: false,
  token: ''
};

export function authReducer(state: IAuth = authState, action: IAction): IAuth {
  switch (action.type) {
    case AuthActionTypes.AUTH_SUCCEEDED: {
      return Object.assign({}, state, {
        authenticated: true,
        token: action.payload
      });
    }
    case AuthActionTypes.AUTH_ERR: {
      return Object.assign({}, state, {
        authenticated: false
      });
    }
    case AuthActionTypes.LOG_OUT: {
      return Object.assign({}, state, {
        authenticated: false,
        token: ''
      });
    }
    default:
      return state;
  }
}


