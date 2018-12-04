import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseService} from '../base.service';

@Injectable()
export class HomeService extends BaseService{
  constructor(http: HttpClient) {
    super(http);
  }

 

}
