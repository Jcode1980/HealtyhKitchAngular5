import { Component, OnInit } from '@angular/core';
import {IRecipe} from '../../models/IRecipe';
import {MyRecipeService} from './my-recipe.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestService} from '../rest.service';
import { RecipeStatus } from '../../models/RecipeStatus';
import { IRecipeSearchDTO } from '../../models/IRecipeSearchDTO';
import {ActivatedRoute} from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.scss']
})
export class MyRecipeComponent implements OnInit {
  recipes: IRecipe [] = [];
  recipeStatuses: Array<RecipeStatus>;
  selectedStatus: RecipeStatus;
  showOwnRecipesOnly: boolean = true;
  
  constructor(private myRecipeService: MyRecipeService, private http: HttpClient, private rest: RestService,  
    private activatedRouter: ActivatedRoute, private userService: UserService) {
    
    let url = activatedRouter.snapshot.url.join('');
    //let href = this.router.url;

    console.log('this is the URL: ');
    console.log(url);
  }

  async ngOnInit() {
    this.loadRecipeStatus();
  
  }

  isAdminView():boolean{
    console.log("calling userIsAdmin: " + this.userService.userIsAdmin());
    return this.userService.userIsAdmin();
  }
  
  async searchRecipes() {
    console.log("searchRecipes with status: ");
    console.log(this.selectedStatus);

    if(this.showOwnRecipesOnly){
      console.log("my-recipe.component - searching only my own recipes");
      this.recipes = await this.myRecipeService.getMyRecipesWithFilters(this.theSearchDTO());
    }else{
      console.log("my-recipe.component - searching all recipes");
      this.recipes = await this.myRecipeService.getRecipesWithFilters(this.theSearchDTO());
    }
    
    console.log("got recipes: ");
    console.log(this.recipes);
  }

  hasRecipes():boolean{
    return this.recipes.length > 0;
  }

  loadRecipeStatus() {
    this.rest.apiGet('api/recipes/allRecipeStatuses').subscribe((recStatus: RecipeStatus[]) => {
        this.recipeStatuses = recStatus;

        this.selectedStatus = this.recipeStatuses.filter(rescipeStatus => rescipeStatus.id == 2)[0];
        
        console.log("found recipeStatus:");
        console.log(this.recipeStatuses.length);
        this.searchRecipes();
      }
    );
  }

  private theSearchDTO(): IRecipeSearchDTO{
    let searchDTO: IRecipeSearchDTO = { searchStrings: [],
      mealTypesID: [],
      cuisinesID: [],
      nutritionalBenefitID: [],
      dietaryRequirementsID: [],
      recipeStatusID: null,
      searchForTrending: false}
      
    if(this.selectedStatus != null){
      console.log("found Selected Status " + this.selectedStatus.id);
      searchDTO.recipeStatusID = this.selectedStatus.id;
    }
    else{
      console.log("No selected status");
      
    }
    return searchDTO;
  }



}
