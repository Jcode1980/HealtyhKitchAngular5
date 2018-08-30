import { IMetric } from "./IMetric";

export interface IMeasuredIngredient {
    id:number
    amount: string;
    name: string;
    metric: IMetric;
  }