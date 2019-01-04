import { IMeasuredIngredient } from "./IMeasuredIngredient";
import { IIngredientSubHeading } from "./IIngredientSubHeading";
import { ICategory } from "./ICategory";

export interface IRecipe {
  id: number;
  name: string;
  numServings: number;
  created: Date;
  readyInMins: number;
  defaultImageID: number;
  descText:string;
  instructions: string;
  mealTypes: Array<any>;
  measuredIngredients: Array<IMeasuredIngredient>;
  nutritionalBenefits: Array<any>;
  dietaryCategories:Array<ICategory>;
  cuisines:Array<any>
  ingredientSubHeadings: Array<IIngredientSubHeading>;
  recipeStatus: any;
  averageRating: number;
  numberOfReviews: number;

}


