import { IMetric } from "./IMetric";
import { IIngredientSubHeading } from "./IIngredientSubHeading";

export interface IMeasuredIngredient {
    id:number
    amount: string;
    name: string;
    metric: IMetric;
    sortID: number;
  }