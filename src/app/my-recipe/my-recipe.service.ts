import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ICategory} from '../../models/ICategory';
import {IRecipe} from '../../models/IRecipe';
import {IRecipeSearchDTO} from '../../models/IRecipeSearchDTO';
import {RestService} from '../rest.service';
import { RecipeStatus } from '../../models/RecipeStatus';
import {BaseService} from '../base.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class MyRecipeService extends BaseService {
  recipeStatuses: Array<RecipeStatus>;
  private sessionAPIURL = `session/recipe/`;



  constructor(private rest: RestService,http: HttpClient) {
    super(http);
  }


  async getMyRecipesWithFilters(searchDTO: IRecipeSearchDTO) {

    return this.rest.apiGet<IRecipe[]>(this.sessionAPIURL + 'myRecipes',  {
      params: this.paramsForSearchDTO(searchDTO)
      // params: {
      //   'searchStrings': searchDTO.searchStrings.toString(),
      //   'mealTypesID': searchDTO.mealTypesID.toString(),
      //   'cuisinesID': searchDTO.cuisinesID.toString(),
      //   'nutritionalBenefitID': searchDTO.nutritionalBenefitID.toString(),
      //   'dietaryRequirementsID': searchDTO.dietaryRequirementsID.toString(),
      //   'recipeStatusID': (searchDTO.recipeStatusID != null ? searchDTO.recipeStatusID.toString() : null)
        
      // }
    }).toPromise();
  }



  


}

