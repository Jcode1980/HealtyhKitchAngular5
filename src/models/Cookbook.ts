import { IRecipe } from '../models/IRecipe';
import { Recipe } from './Recipe';
import {environment} from '../environments/environment';

export class Cookbook {
    id: number;
    name: string;
    defaultRecipeDto: IRecipe;
    recipesDto: IRecipe[];

    constructor(cookbook:any){
        this.name = cookbook.name;
        this.defaultRecipeDto= cookbook.defaultRecipeDto;
        this.recipesDto = cookbook.recipesDto;
        this.id = cookbook.id;
    }

    displayName():String{
        return this.name != null ? this.name : "Untitled";
    }

    defaultImageID(){
        if(this.defaultRecipeDto != null && this.defaultRecipeDto.defaultImageID != null ){
            return this.defaultRecipeDto.defaultImageID;
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