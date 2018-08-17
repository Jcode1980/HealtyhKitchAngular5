import { Component, OnInit } from '@angular/core';
import {IRecipe} from '../../models/IRecipe';
import {MyRecipeService} from './my-recipe.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.scss']
})
export class MyRecipeComponent implements OnInit {
  recipes: IRecipe [] = [];

  constructor(private myRecipeService: MyRecipeService, private http: HttpClient, private rest: RestService) {
  }

  ngOnInit() {
    this.searchForMyRecipes();
  }

  async searchForMyRecipes() {
    this.recipes = await this.myRecipeService.getMyRecipesForUser();
  }


}
