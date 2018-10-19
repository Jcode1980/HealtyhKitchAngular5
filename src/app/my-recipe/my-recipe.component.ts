import { Component, OnInit } from '@angular/core';
import {IRecipe} from '../../models/IRecipe';
import {MyRecipeService} from './my-recipe.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestService} from '../rest.service';
import { RecipeStatus } from '../../models/RecipeStatus';
import { IRecipeSearchDTO } from '../../models/IRecipeSearchDTO';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.scss']
})
export class MyRecipeComponent implements OnInit {
  recipes: IRecipe [] = [];
  recipeStatuses: Array<RecipeStatus>;
  selectedStatus: RecipeStatus;
  private isAdminView: boolean = true;

  constructor(private myRecipeService: MyRecipeService, private http: HttpClient, private rest: RestService,  
    private activatedRouter: ActivatedRoute) {
    
    let url = activatedRouter.snapshot.url.join('');
    //let href = this.router.url;

    console.log('this is the URL: ');
    console.log(url);
  }

  async ngOnInit() {
    this.loadRecipeStatus();
  
  }

  async searchRecipes() {
    
    if(this.isAdminView){
      this.recipes = await this.myRecipeService.getRecipesWithFilters(this.theSearchDTO());
    }else{
      this.recipes = await this.myRecipeService.getMyRecipesWithFilters(this.theSearchDTO());
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
      console.log("found Selected Status");
      searchDTO.recipeStatusID = this.selectedStatus.id;
    }
    else{
      console.log("No selected status");
      
    }

    return searchDTO;
  }

  public getIsAdminView(): boolean{ return this.isAdminView;}

  public setIsAdminView(value: boolean){
    this.isAdminView = value;

    if(this.isAdminView){
      this.selectedStatus = RecipeStatus.submittedStatus();
    }
  }
}
