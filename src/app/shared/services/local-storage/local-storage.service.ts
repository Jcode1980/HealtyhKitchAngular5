import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class LocalStorageService {

  constructor() { }
  setAuthToken(token: string) {
    Cookie.set('auth_token', token);
  }
  getAuthToken() {
    return Cookie.get('auth_token');
  }
  authTokenIsEmpty() {
    return Cookie.get('auth_token') === null || Cookie.get('auth_token').length <= 0;
  }
  purgeAuthToken() {
    Cookie.delete('auth_token');
    //console.log("after purge.. is token empty??");
    //console.log(this.authTokenIsEmpty());
  }

}
