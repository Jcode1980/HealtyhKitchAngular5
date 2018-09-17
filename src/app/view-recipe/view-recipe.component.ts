import { Component, OnInit } from '@angular/core';
import { IMeasuredIngredient } from '../../models/IMeasuredIngredient';
import { IRecipe } from '../../models/IRecipe';
import {RestService} from '../rest.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import { IReview } from '../../models/IReview';
import { User } from '../../models/User';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  currentRecipe : IRecipe;
  apiURL = environment.apiUrl;
  showReviewModal:boolean = false;
  private recipesAPIURL = `api/recipes/`;
  
  reviews: Array<IReview> = [];

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute) { }

  async ngOnInit() {
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    console.log("await for recipe");
    await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise()
      .then(recipe => this.currentRecipe = recipe);
    console.log("The instuction is: " + this.currentRecipe.instructions);
    //console.log(this.currentRecipe);

    this.getReviewsForRecipe();
  }

  //should be moved into ingredient class if used in multiple locations
  ingredientDisplay(theIngredient:IMeasuredIngredient):string{
    let theDisplay = new String(theIngredient.amount);
    
    if(theIngredient.metric != null && theIngredient.metric.code != null){
      theDisplay = theDisplay.concat(" " + theIngredient.metric.code);
    }
    
    theDisplay = theDisplay.concat(" " + theIngredient.name);
    //console.log("the name is: " + theDisplay.toString());
    return theDisplay.toString();
  }


  recipeImageSource():string{
    let imageSource;

   if(this.currentRecipe.defaultImageID){
      //console.log("333333");
      imageSource = this.apiURL +"files/RecipeImage/"+ this.currentRecipe.defaultImageID +"?quality=2";
    }
    //console.log("returning imagesource");
    //console.log(imageSource);
    return imageSource;

  }

  //FIX: need to do batching fetch for reviews
  async getReviewsForRecipe(){    
    console.log("this is the url: ");
    console.log(this.recipesAPIURL + 'reviews');
    return this.rest.apiGet<IReview[]>(this.recipesAPIURL + 'reviews/' + this.currentRecipe.id, {}).toPromise()
      .then(reviews => 
        {
          console.log("got reviews " + reviews.length);
          
          for (let review of reviews) { 
            review.user = new User(review.user);
            console.log("Reviewer URL");
            console.log(review.user.profileImagePreviewURL());
            this.reviews.push(review)
          }
        }
      );
  }

  nutritionalBenefitsDisplay():string{
    return this.displayArrayNames(this.currentRecipe.nutritionalBenefits);
  }

  dietaryRequirementsDisplay():string{
    return this.displayArrayNames(this.currentRecipe.dietaryCategories);
  }

  cuisinesDisplay():string{
    return this.displayArrayNames(this.currentRecipe.cuisines);
  }

  private displayArrayNames(theArray:Array<any>){
    return theArray.map((a) => a.name).join(', ');
  }

 

}
