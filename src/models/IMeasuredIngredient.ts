import { IMetric } from "./IMetric";

export interface IMeasuredIngredient {
    id:number
    amount: number;
    name: string;
    metric: IMetric;
  }