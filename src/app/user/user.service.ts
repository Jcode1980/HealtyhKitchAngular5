import { Injectable } from '@angular/core';
//import {IUser} from '../../models/IUser';
import {User} from '../../models/User';
import {IUser} from '../../models/IUser';
import {Observable} from 'rxjs/Observable';
import {IUserAuthCredentials} from '../../models/IUserAuthCredentials';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {LocalStorageService} from '../shared/services/local-storage/local-storage.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IAsyncResponse} from '../../models/IAsyncResponse';
import {IAppState} from '../store/IAppState';
import {LogInUser, LogOutUser} from '../store/actions/currentuser.actions';


@Injectable()
export class UserService {

  private authenticatedUser: Observable<User>;
  // baseUrl = `${environment.apiUrl}/user-service`;
  private isAdminView: boolean = false;
  
  constructor(private store: Store<IAppState>,private router: Router, private localStorageService: LocalStorageService,
    private authService: AuthService, private http: HttpClient) {
    this.authenticatedUser = this.store.select(state => state.loggedInUser);
    console.log("Auth user is: ");
    console.log(this.authenticatedUser);

    this.authenticatedUser.subscribe(
      user => {
        this.isAdminView = (user != null && user.role === "ROLE_USER");
        //console.log("user role is:");
        //console.log(user);
        //console.log(user != null ? user.role : "no role");
        //console.log("In subscribe fucntion: "+ this.isAdminView);
      }
    );
  }



  isAuthenticated(): Observable<boolean> {
    if (
      this.localStorageService.getAuthToken() !== null &&
      this.localStorageService.getAuthToken().length > 0
    ) {
      let tokenStatusObs =  this.authService.tokenStatus(this.localStorageService.getAuthToken());
      //FIX ME.. how to i chekc the tokenStatusOBS.. at the moment.. having token in local storage
      //is enough to say that it's autehnicated.
      console.log('returning true??' + this.localStorageService.getAuthToken());
      
      console.log(tokenStatusObs);
      return Observable.of(true);

    } else {
      return Observable.of(false);
    }
  }
  
  

  
  public async authenticate(user: IUserAuthCredentials): Promise<IAsyncResponse> {

    try {
      let authToken = await this.authService.signIn(user);
      console.log("what is my token? ");
      console.log(authToken.token);
      
      this.localStorageService.setAuthToken(authToken.token);
      
      console.log("userDto passedIN");
      console.log(authToken.userDto);
      this.store.dispatch(new LogInUser(authToken.userDto));
      
      console.log(this.store);

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

  public getAuthenticatedUser(): Observable<User> {
    return this.authenticatedUser;
  }

  public signout() {
    this.localStorageService.purgeAuthToken();
    this.store.dispatch(new LogOutUser());
    this.router.navigate(['/']);

    console.log('signed out autho token is: ' + this.localStorageService.getAuthToken());

  }

  public userIsAdmin():boolean{
    //console.log("returning user is admin?? " + this.isAdminView);
    return this.isAdminView;
  }

  

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
