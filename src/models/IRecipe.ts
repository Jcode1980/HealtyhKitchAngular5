import { IMeasuredIngredient } from "./IMeasuredIngredient";
import { ICategory } from "./ICategory";

export interface IRecipe {
  id: number;
  name: string;
  numServings: number;
  readyInMins: number;
  defaultImageID: number;
  descText:string;
  instructions: string;
  mealTypes: Array<any>;
  measuredIngredients: Array<IMeasuredIngredient>;
  nutritionalBenefits: Array<any>;
  dietaryCategories:Array<ICategory>;
  cuisines:Array<any>
}
