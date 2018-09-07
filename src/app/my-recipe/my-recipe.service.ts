import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ICategory} from '../../models/ICategory';
import {IRecipe} from '../../models/IRecipe';
import {RestService} from '../rest.service';


@Injectable()
export class MyRecipeService {

  private sessionAPIURL = `session/recipe/`;


  constructor(private rest: RestService) {
  }

  //FIX me to use Logged in User
  async getMyRecipesForUser(){    
    console.log("this is the url: ");
    console.log(this.sessionAPIURL + 'myRecipes');
    return this.rest.apiGet<IRecipe[]>(this.sessionAPIURL + 'myRecipes', {}).toPromise();
  }

}

