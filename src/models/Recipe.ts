import { IRecipe } from '../models/IRecipe';
import { ICategory } from "./ICategory";
import { IMeasuredIngredient } from "./IMeasuredIngredient";
import { IIngredientSubHeading } from "./IIngredientSubHeading";

export class Recipe implements IRecipe {
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
    dietaryCategories: Array<ICategory>;
    cuisines: Array<any>;
    ingredientSubHeadings: Array<IIngredientSubHeading> ;
  
   
    constructor(iRecipe?: IRecipe ) {
    this.id = (iRecipe != null ? iRecipe.id : null);
    this.name = (iRecipe != null ? iRecipe.name : null);
    this.numServings = (iRecipe != null ? iRecipe.numServings : null);
    this.readyInMins = (iRecipe != null ? iRecipe.readyInMins : null);
    this.defaultImageID = (iRecipe != null ? iRecipe.defaultImageID : null);
    this.descText = (iRecipe != null ? iRecipe.descText : null);
    this.instructions = (iRecipe != null ? iRecipe.instructions : null);
    this.mealTypes = (iRecipe != null ? iRecipe.mealTypes : []);
    this.measuredIngredients = (iRecipe != null ? iRecipe.measuredIngredients : []);
    this.nutritionalBenefits = (iRecipe != null ? iRecipe.nutritionalBenefits : []);
    this.dietaryCategories = (iRecipe != null ? iRecipe.dietaryCategories : []);
    this.cuisines = (iRecipe != null ? iRecipe.cuisines : []);
    this.ingredientSubHeadings = (iRecipe != null ? iRecipe.ingredientSubHeadings : []);
    }

    ingredientsForSubHeading(subHeading : IIngredientSubHeading):Array<IMeasuredIngredient>{
        return  this.measuredIngredients.filter(ingredient => ingredient.ingredientSubHeading === subHeading);
    }

    
    idArrayGenerator(theArray:Array<any>):Array<number>{
        theArray.map(e => {
          return {
            id: e.id
          };
        });
    
        return theArray;
      }
    
    
      recipeDataToReturn():any{
        let cusinesListToPost = this.idArrayGenerator(this.cuisines);
        let mealTypesToPost = this.idArrayGenerator(this.mealTypes);
        let benifitsListToPost = this.idArrayGenerator(this.nutritionalBenefits);
        let dietaryCategoriesToPost = this.idArrayGenerator(this.dietaryCategories);
        //let ingredientSubHeadingsToPost = this.ingredientSubHeadings;    
        let ingredientSubHeadingsToPost = [];    
    
        let ingredientsListToPost = this.measuredIngredients.map((e: any, index:number) => {
          return {
            id: e.id,
            amount: e.amount,
            metric: { id: e.metric.id, name: e.metric.name, code: e.metric.code },
            name: e.name,
            sortID: index +1
          };
        });
    
        let returningRecipe : any ={
          id:this.id,
          defaultImageID: this.defaultImageID,
          numServings: this.numServings,
          readyInMins: this.readyInMins,
          descText: this.descText,
          cuisines: cusinesListToPost,
          nutritionalBenefits: benifitsListToPost,
          dietaryCategories: dietaryCategoriesToPost,
          instructions: this.instructions,
          mealTypes: mealTypesToPost,
          measuredIngredients: ingredientsListToPost,
          ingredientSubHeadings: ingredientSubHeadingsToPost,
          name: this.name
        };
    
        console.log("Returning recipe: ");
        console.log(returningRecipe);
        return returningRecipe;
        
      }

      //construct ingredient Listing here
      ingredientListing(): Array<any>{
        let ingredientListing: Array<any> = this.measuredIngredients;
        ingredientListing = ingredientListing.concat(this.ingredientsForSubHeading);
        //ingredientListing.push(this.ingredientSubHeadings);
        //ingredientListing.push(this.measuredIngredients);
        let sortedIngredientList = ingredientListing.sort((n1,n2) => n1["sortID"] - n2["sortID"]);

        return sortedIngredientList;
      
      }





      // private compareIngredientListing(listingA, listingB) {
      //   if (listingA['sortID'] < listingB['sortID']) {
      //    return -1;
      //   }
      //   if (listingA['sortID'] > listingB['sortID']) {
      //    return 1;
      //   }
      //   return 0;
      //  }
      
    

}