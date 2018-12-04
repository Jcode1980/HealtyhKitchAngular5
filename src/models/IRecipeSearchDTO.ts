import { IMeasuredIngredient } from "./IMeasuredIngredient";
import { IIngredientSubHeading } from "./IIngredientSubHeading";
import { RecipeStatus } from "./RecipeStatus";


export interface IRecipeSearchDTO {
  searchStrings?: Array<string>;
  mealTypesID?: Array<number>;
  cuisinesID?: Array<number>;
  nutritionalBenefitID?: Array<number>;
  dietaryRequirementsID?: Array<number>;
  recipeStatusID?: number;
  searchForTrending?: boolean;

}


