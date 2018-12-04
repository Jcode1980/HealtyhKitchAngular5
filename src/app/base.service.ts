import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from '../models/ICategory';
import {IRecipe} from '../models/IRecipe';
import {IRecipeSearchDTO} from '../models/IRecipeSearchDTO';
import {environment} from '../environments/environment';
import { RecipeStatus } from '../models/RecipeStatus';

@Injectable()
export class BaseService {
  private baseUrl = `${environment.apiUrl}api/recipes`;

  constructor(private http: HttpClient) {
  }
  async getMealTypes() {
    return this.http.get<ICategory[]>(`${this.baseUrl}/allMealTypes`).toPromise();
  }

  async getDietaryCategories() {
    return this.http.get<ICategory[]>(`${this.baseUrl}/allDietaryCategories`).toPromise();
  }

  async getHealthBenefits() {
    return this.http.get<ICategory[]>(`${this.baseUrl}/allNutritionalBenefits`).toPromise();
  }

  async getCuisines() {
    return this.http.get<ICategory[]>(`${this.baseUrl}/allCuisines`).toPromise();
  }

  async getRecipeStatuses() {
    return this.http.get<RecipeStatus[]>(`${this.baseUrl}/allRecipeStatuses`).toPromise();
  }

  async getTrandingRecipes() {
    return this.http.get<IRecipe[]>(`${this.baseUrl}/recipes`,
      {
        params: {'searchForTrending': 'true'}
      }
    ).toPromise();
  }

  // async getRecipesWithFilters(searchStrings?: string[],
  //                             mealTypesID?: number[],
  //                             cuisinesID?: number[],
  //                             nutritionalBenefitID?: number[],
  //                             dietaryRequirementsID?: number[]) {
  
  async getRecipesWithFilters(searchDTO: IRecipeSearchDTO) {
   
    return this.http.get<IRecipe[]>(`${this.baseUrl}/recipes`,
      {
        params: this.paramsForSearchDTO(searchDTO)
        // params: {
        //   'searchStrings': searchDTO.searchStrings.toString(),
        //   'mealTypesID': searchDTO.mealTypesID.toString(),
        //   'cuisinesID': searchDTO.cuisinesID.toString(),
        //   'nutritionalBenefitID': searchDTO.nutritionalBenefitID.toString(),
        //   'dietaryRequirementsID': searchDTO.dietaryRequirementsID.toString(),
        //   'recipeStatusID': (searchDTO.recipeStatusID != null ? searchDTO.recipeStatusID.toString() : null)
        // }
      }
    ).toPromise();
  }

  paramsForSearchDTO(searchDTO: IRecipeSearchDTO){
    let params = {};
    
    if(searchDTO.searchStrings != null && searchDTO.searchStrings.length > 0){
      params['searchStrings'] = searchDTO.searchStrings.toString();
    }
  
    if(searchDTO.mealTypesID != null && searchDTO.mealTypesID.length > 0){
      params['mealTypesID'] = searchDTO.mealTypesID.toString();
    }
  
    if(searchDTO.cuisinesID != null && searchDTO.cuisinesID.length > 0){
      params['cuisinesID'] = searchDTO.cuisinesID.toString();
    }
  
    if(searchDTO.nutritionalBenefitID != null && searchDTO.nutritionalBenefitID.length > 0){
      params['nutritionalBenefitID'] = searchDTO.nutritionalBenefitID.toString();
    }
  
    if(searchDTO.dietaryRequirementsID != null && searchDTO.dietaryRequirementsID.length > 0){
      params['dietaryRequirementsID'] = searchDTO.dietaryRequirementsID.toString();
    }
  
    if(searchDTO.recipeStatusID != null){
      params['recipeStatusID'] = searchDTO.recipeStatusID.toString();
    }
  
    if(searchDTO.searchForTrending != null){
      params['searchForTrending'] = searchDTO.searchForTrending;
    }
   
    return params;
  }
}
