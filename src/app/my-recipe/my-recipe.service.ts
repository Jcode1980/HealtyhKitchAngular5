import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ICategory} from '../../models/ICategory';
import {IRecipe} from '../../models/IRecipe';


@Injectable()
export class MyRecipeService {

  private baseUrl = `${environment.apiUrl}api/recipes`;

  constructor(private http: HttpClient) {
  }

  //FIX me to use Logged in User
  async getMyRecipesForUser(){
    return this.http.get<IRecipe[]>(`${this.baseUrl}/recipes`,  {params:{'createdByUserID': "1"}}).toPromise();
  }

}

