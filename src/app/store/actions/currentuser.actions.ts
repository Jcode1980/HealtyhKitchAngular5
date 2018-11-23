import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const LOG_IN_USER = 'USER_Login';
export const LOG_OUT_USER = 'User_Logout';

export class LogInUser implements Action {
    readonly type = LOG_IN_USER;

    constructor(public payload: any) { }
}

export class LogOutUser implements Action {
    readonly type = LOG_OUT_USER;

    constructor() { }
}

export type LoginActions = LogInUser | LogOutUser;