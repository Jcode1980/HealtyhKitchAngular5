import {userReducer} from './userReducer';
import {authReducer} from './authReducer';
import {IAppState} from '../../../models/IAppState';
import * as ngrx from '@ngrx/store';
import * as store from '@ngrx/core';
import {ActionReducerMap} from '@ngrx/store';

export const rootReducer: ActionReducerMap<IAppState> = {
  authReducer,
  userReducer,
};

