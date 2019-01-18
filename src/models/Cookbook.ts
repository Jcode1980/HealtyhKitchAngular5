import { IRecipe } from '../models/IRecipe';
import { Recipe } from './Recipe';
import {environment} from '../environments/environment';

export class Cookbook {
    id: number;
    name: string;
    defaultRecipe: IRecipe;
    recipes: IRecipe[];

    constructor(cookbook:any){
        this.name = cookbook.name;
    }

    displayName():String{
        return this.name != null ? this.name : "Untitled";
    }

    defaultImageID(){
        if(this.defaultRecipe != null && this.defaultRecipe.defaultImageID != null ){
            return this.defaultRecipe.defaultImageID;
        }
        else{
            return null;
        }
    }

    defaultImageURL(){
        if(this.defaultImageID()){
            return environment.apiUrl + "files/images/" +this.defaultImageID();
        } 
        else{
            return null;
        }
    }


    
}