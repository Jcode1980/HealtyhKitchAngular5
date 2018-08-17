import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ICategory} from '../../models/ICategory';
import {IRecipe} from '../../models/IRecipe';

@Injectable()
export class HomeService {

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

  async getTrandingRecipes() {
    return this.http.get<IRecipe[]>(`${this.baseUrl}/recipes`,
      {
        params: {'searchForTrending': 'true'}
      }
    ).toPromise();
  }

  async getRecipesWithFilters(searchStrings: string[],
                              mealTypesID: number[],
                              cuisinesID: number[],
                              nutritionalBenefitID: number[],
                              dietaryRequirementsID: number[]) {

    return this.http.get<IRecipe[]>(`${this.baseUrl}/recipes`,
      {
        params: {
          'searchStrings': searchStrings,
          'mealTypesID': mealTypesID.toString(),
          'cuisinesID': cuisinesID.toString(),
          'nutritionalBenefitID': nutritionalBenefitID.toString(),
          'dietaryRequirementsID': dietaryRequirementsID.toString()
        }
      }
    ).toPromise();
  }

}
