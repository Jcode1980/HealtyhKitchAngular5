import {Component, Input, OnInit} from '@angular/core';
import { IRecipe } from '../../../models/IRecipe';
import {environment} from '../../../environments/environment'; 
import { Recipe } from '../../../models/Recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: IRecipe;
  @Input() readOnly: boolean;
  
  constructor() {
  }

  ngOnInit() {
  }

  imgLink():string{
    return environment.apiUrl + "files/RecipeImage/"+ this.recipe.defaultImageID +"?quality=3";
  }

  hasDefaultImage():boolean{
    return this.recipe.defaultImageID != null;
  }

  // recipeLink():string{
  //   if(this.readOnly){
  //     return "/view-recipe/" + this.recipe.id;
  //   }
  //   else{
  //     return "/edit-recipe/" + this.recipe.id;
  //   }
  // }

  recipeLink():string{
    return "/view-recipe/" + this.recipe.id;
  }

  creatorImageSource(): string{
    let imageSource = null;

    if(this.recipe.createdby.userProfileImageID != null){
      imageSource = environment.apiUrl +"files/Images/"+ this.recipe.createdby.userProfileImageID ;
    }
    return imageSource;

  }

  

}
