import { Component, OnInit } from '@angular/core';
import { IMeasuredIngredient } from '../../models/IMeasuredIngredient';
import { IRecipe } from '../../models/IRecipe';
import {RestService} from '../rest.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  currentRecipe : IRecipe;
  apiURL = environment.apiUrl;

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute) { }

  async ngOnInit() {
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    console.log("await for recipe");
    await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise()
      .then(recipe => this.currentRecipe = recipe);
    console.log("got recipe");
    console.log(this.currentRecipe);
  }

  //should be moved into ingredient class if used in multiple locations
  ingredientDisplay(theIngredient:IMeasuredIngredient):string{
    let theDisplay = new String(theIngredient.amount);
    
    if(theIngredient.metric != null && theIngredient.metric.code != null){
      theDisplay.concat(" " + theIngredient.metric.code);
    }

    theDisplay.concat(" " + theIngredient.name);
    
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
}
