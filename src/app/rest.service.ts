import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';

@Injectable()
export class RestService {

  base  = environment.apiUrl;

  constructor(public http: HttpClient) {
  }

  apiGet<T>(path: string = '', params?: any, options?: HttpOptions): Observable<T> {
    if (params) {
      path += '?';
      Object.keys(params).forEach(k => {
        path += k + '=' + params[k] + '&';
      });
    }
    return this.http.get<T>(this.base + path, options);
  }

  apiPost<T>(path: string, body: any | null, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(this.base + path, body, options);
  }

  apiPut<T>(path: string, body: any | null, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(this.base + path, body, options);
  }

  apiPatch<T>(path: string, body: any | null, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(this.base + path, body, options);
  }

  apiDelete<T>(path: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(this.base + path, options);
  }

}


interface HttpOptions {
  headers: HttpHeaders;
}
