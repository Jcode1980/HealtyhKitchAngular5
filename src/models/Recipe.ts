import { IRecipe } from '../models/IRecipe';
import { ICategory } from "./ICategory";
import { IMeasuredIngredient } from "./IMeasuredIngredient";
import { User } from "./User";
import { IIngredientSubHeading } from "./IIngredientSubHeading";
import { RecipeStatus } from '../models/RecipeStatus';

export class Recipe implements IRecipe {
  id: number;
  name: string;
  numServings: number;
  readyInMins: number;
  defaultImageID: number;
  descText: string;
  created: Date;
  instructions: string;
  mealTypes: Array<any>;
  measuredIngredients: Array<IMeasuredIngredient>;
  nutritionalBenefits: Array<any>;
  dietaryCategories: Array<ICategory>;
  cuisines: Array<any>;
  ingredientSubHeadings: Array<IIngredientSubHeading> ;
  recipeStatus: RecipeStatus;
  averageRating: number;
  numberOfReviews: number;
  createdby: User;
  //private _ingredientListing : Array<any>;

  
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
  this.recipeStatus = (iRecipe != null ? iRecipe.recipeStatus : RecipeStatus.newStatus());
  this.averageRating = (iRecipe != null ? iRecipe.averageRating : null);
  this.numberOfReviews = (iRecipe != null ? iRecipe.numberOfReviews : null);
  this.createdby = (iRecipe != null ? iRecipe.createdby : null);
  
  }

  // ingredientsForSubHeading(subHeading : IIngredientSubHeading):Array<IMeasuredIngredient>{
  //     return  this.measuredIngredients.filter(ingredient => ingredient.ingredientSubHeading === subHeading);
  // }

  
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
      let ingredientSubHeadingsToPost = this.ingredientSubHeadings;    
      //let ingredientSubHeadingsToPost = [];    
  
      let ingredientsListToPost = this.measuredIngredients.map((e: any, index:number) => {
        let returnData;

        returnData =  {
          id: e.id,
          amount: e.amount,
          name: e.name,
          sortID: e.sortID
        };
        //console.log("index value: " + index);
        if(e.metric != null){
          returnData["metric"] = { id: e.metric.id, name: e.metric.name, code: e.metric.code };
        }

        return returnData;
      });
      
      console.log("this is my recipe status: ");
      console.log(this.recipeStatus);
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
        created: this.created,
        name: this.name,
        recipeStatus: this.recipeStatus
      };
  
      console.log("Returning recipe: ");
      console.log(returningRecipe);
      return returningRecipe;
      
    }

    // //construct ingredient Listing here
    // ingredientListing(): Array<any>{
    //   if(this._ingredientListing == null){
    //     this._ingredientListing = this.measuredIngredients;
    //     this._ingredientListing = this._ingredientListing.concat(this.ingredientSubHeadings);
        
    //     this._ingredientListing = this._ingredientListing.sort((n1,n2) => n1["sortID"] - n2["sortID"]);
    //   }
    
    //   return this._ingredientListing;
    // }

    //construct ingredient Listing here
    ingredientListing(): Array<any>{
      let ingredientListing : Array<any> = this.measuredIngredients;
      ingredientListing = ingredientListing.concat(this.ingredientSubHeadings);
      ingredientListing = ingredientListing.sort((n1,n2) => n1["sortID"] - n2["sortID"]);
      console.log("sorted listings: ");
      console.log(ingredientListing);
      return ingredientListing;
    }

    saveIngredientListing(ingredientListing : Array<any>){
      let measuredIngredients : Array<IMeasuredIngredient> = new Array();
      let subHeadings : Array<IIngredientSubHeading> = new Array();

      ingredientListing.forEach( 
        (listing, index) => {
          console.log("setting index for listing " );
          console.log(index + " ");
          console.log(listing);
          listing.sortID = index;

          if(listing["amount"] === undefined){
            subHeadings.push(listing);
          }
          else{
            measuredIngredients.push(listing);
          }
        } 
      );
      
      console.log("saved ingredients: ");
      console.log(this.measuredIngredients);
      this.measuredIngredients = measuredIngredients;
      this.ingredientSubHeadings = subHeadings;
    }

    canBeSubmittedForApproval(){
      return this.isNew() || this.isRejected();
    }

    //FIX ME .. this sux
    isNew(){
      return this.recipeStatus.id === 1;
    }

    isSubmittedForApproval(){
      return this.recipeStatus.id === 2;
    }

    isPublished(){
      return this.recipeStatus.id === 3;
    }

    isRejected(){
      return this.recipeStatus.id === 4;
    }

    

    canSubmitForApproval(){
    
    }


    allMandatoryFieldsValid(){
      let isValid = true;

      if(name)


      return true;
    }

    

  // addIngredient(index : number) : IMeasuredIngredient{
  //   let newIngredient : IMeasuredIngredient = this.createNewIngredient(index);
  //   this.reOrderSubHeadingAndMeasuredIngredientsArray(index)
  //   this.measuredIngredients.push(newIngredient);

  //   return newIngredient;
  // }

  // addSubHeading(subHeading : IIngredientSubHeading){
  //   this.reOrderSubHeadingAndMeasuredIngredientsArray(subHeading.sortID)
  //   this.ingredientSubHeadings.push(subHeading);
  // }


  // private reOrderSubHeadingAndMeasuredIngredientsArray(index : number){
  //   this.reOrderSorts(index, this.measuredIngredients);
  //   this.reOrderSorts(index, this.ingredientSubHeadings);
  // }

  // private reOrderSorts(index:number, theArray:Array<any>){
  //   theArray.forEach((listing) => { 
  //     if(listing["sortID"] >= index){
  //       listing["sortID"] = listing["sortID"] + 1;
  //     }   
  //   });
  // }






    

}