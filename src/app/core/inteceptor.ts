import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import {LocalStorageService} from '../shared/services/local-storage/local-storage.service';

import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private localStorageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;

    console.log("i got to the interceptor");
    //let token = this.token.getToken();
    let token = this.localStorageService.getAuthToken();
    console.log("what is my token? ");
    console.log(token);
    if(token){
      console.log("adding token with size");
      console.log(token.length);
      
      console.log(token);
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq).do(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            console.log('req url :: ' + req.url);
            if (err.status === 401) {
              this.router.navigate(['user']);
            }
          }
        }
      );
  }

}
