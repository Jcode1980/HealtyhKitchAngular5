import { Injectable } from '@angular/core';
import {AuthenticatedAction, LogoutAction} from '../store/actions/AuthActions';
import {IUser} from '../../models/IUser';
import {Observable} from 'rxjs/Observable';
import {IUserAuthCredentials} from '../../models/IUserAuthCredentials';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {LocalStorageService} from '../shared/services/local-storage/local-storage.service';
import {Router} from '@angular/router';
import {IAppState} from '../../models/IAppState';
import {environment} from '../../environments/environment';
import {UserLoaded} from '../store/actions/UsersActions';
import {Store} from '@ngrx/store';
import {IAsyncResponse} from '../../models/IAsyncResponse';
import {TokenStorage} from '../core/token.storage';

@Injectable()
export class UserService {

  private currentUser: Observable<IUser>;
  // baseUrl = `${environment.apiUrl}/user-service`;

  // async getCurrentUser() {
  //   this.http.get<IUser>(`${this.baseUrl}.....`, {
  //     headers: new HttpHeaders().set('Authorization', this.localStorageService.getAuthToken())
  //   }).subscribe(data => {
  //     this.store.dispatch(new UserLoaded({
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       email: data.email,
  //       avatarLink: data.avatarLink !== undefined ? `${this.baseUrl}${data.avatarLink}?t=${new Date().getTime()}`
  //         : `./assets/img/unknown.png`
  //     }));
  //   });
  // }


  isAuthenticated() {
    // if (
    //   this.localStorageService.getAuthToken() === 'token'
    // ) {
    //   return Observable.of(true);
    // } else {
    //   return Observable.of(false);
    // }
    if (
      this.localStorageService.getAuthToken() !== null &&
      this.localStorageService.getAuthToken().length > 0
    ) {
      return this.authService.tokenStatus(this.localStorageService.getAuthToken());
    } else {
      return Observable.of(false);
    }
  }
  
  constructor(private store: Store<IAppState>,
              private router: Router,
              private localStorageService: LocalStorageService,
              private tokenStorage: TokenStorage,
              private authService: AuthService,
              private http: HttpClient) {
    this.currentUser = this.store.select(state => state.userReducer);
  }

  public async authenticate(user: IUserAuthCredentials): Promise<IAsyncResponse> {

    try {
      let token = await this.authService.signIn(user);
      console.log("what is my token? ");
      console.log(token.token);
      
      //Johns Shizz that i'm trying to figure out
      this.tokenStorage.saveToken(token.token);

      this.localStorageService.setAuthToken(token.token);
      this.store.dispatch(new AuthenticatedAction());
      this.router.navigate(['/']);
      return {succeeded: true};
    } catch (err) {
      if (err.status === 401) {
        return {
          succeeded: false,
          responseText: 'No user found with these email and password'
        };
      }
      return {
        succeeded: false,
        responseText: 'Something went wrong. Try again later'
      };
    }
  }

  public authenticatedUser(): Observable<IUser> {
    return this.currentUser;
  }

  // public signout() {
  //   this.localStorageService.purgeAuthToken();
  //   this.store.dispatch(new LogoutAction());
  //   this.router.navigate(['/auth/login']);
  // }

  // public async changeName(firstName: string, lastName: string): Promise<IAsyncResponse> {
  //   try {
  //     const response: IUser = await this.http.put<IUser>(`${this.baseUrl}.....`, {
  //       firstName,
  //       lastName
  //     }, {
  //       headers: new HttpHeaders().set('Authorization', this.localStorageService.getAuthToken())
  //     }).toPromise();
  //     // Not the best pattern
  //     response.avatarLink = `${this.baseUrl}${response.avatarLink}`;
  //     return {
  //       succeeded: true,
  //       responseText: 'Successfully saved',
  //       data: response
  //     };
  //   } catch (err) {
  //     let responseText = '';
  //     if (err.status === 400) {
  //       responseText = 'Bad request';
  //     } else {
  //       responseText = 'Something went wrong. Try again later';
  //     }
  //     return {
  //       responseText,
  //       succeeded: false
  //     };
  //   }
  // }

  // public async uploadImg(avatar: any): Promise<IAsyncResponse> {
  //   try {
  //     const body = new FormData();
  //     body.append('file', avatar);
  //     const response: any = await this.http.post(`${this.baseUrl}.....`,
  //       body, {
  //         headers: new HttpHeaders().set('Authorization', this.localStorageService.getAuthToken())
  //       }).toPromise();
  //     console.log(`${this.baseUrl}${response.location}`);
  //     return {
  //       succeeded: true,
  //       data: `${this.baseUrl}${response.location}?t=${new Date().getTime()}`,
  //       responseText: 'Image successfully updated'
  //     };
  //   } catch (err) {
  //     return {
  //       succeeded: false,
  //       responseText: 'Image upload failed'
  //     };
  //   }
  // }

  // public async changePassword(currentPassword: string, newPassword: string): Promise<IAsyncResponse> {
  //   try {
  //     const response: any = await this.http.put(`${this.baseUrl}....`,
  //       {
  //         currentPassword,
  //         newPassword
  //       }, {
  //         headers: new HttpHeaders().set('Authorization', this.localStorageService.getAuthToken())
  //       }).toPromise();
  //     return {
  //       succeeded: true,
  //       responseText: 'Your password was changed'
  //     };
  //   } catch (err) {
  //     let responseText = '';
  //     if (err.status === 404) {
  //       responseText = 'Your current password is not correct';
  //     } else {
  //       responseText = 'Something went wrong. Try again later';
  //     }
  //     return {
  //       responseText,
  //       succeeded: false
  //     };
  //   }
  // }

}
