import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import {RestService} from '../rest.service';
import { IRecipe } from '../../models/IRecipe';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { InjectSetupWrapper } from '@angular/core/testing';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-parent-recipe',
  templateUrl: './parent-recipe.component.html',
  styleUrls: ['./parent-recipe.component.scss']
})
export class ParentRecipeComponent implements OnInit {
  currentRecipe: Recipe;
  private readOnlyFlag: boolean = false;

  selectedAction: string= "Please Select";

  private PUBLISH_RECIPE: string = "Publish";
  private EMAIL_CREATOR: string = "Email Creator";
  private REJECT_RECIPE: string = "Reject"

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute,  
    private location: Location, private userService: UserService) { }

  async ngOnInit() {
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    console.log("await for recipe");
    await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise()
      .then(recipe => this.currentRecipe = new Recipe(recipe) );

  }

  isAdminView():boolean{
    return this.userService.userIsAdmin();
  } 

  runSelectedAction():void{
    console.log("Running action : " + this.selectedAction);

  }

  backClicked() {
    this.location.back();
  }

  showViewOnly():boolean{
    return this.readOnlyFlag  || !this.currentRecipe.isNew();
  }

  negatedShowViewOnly():boolean{
    return !this.showViewOnly();
  }

  recipeActions():string[]{
    return [this.PUBLISH_RECIPE, this.EMAIL_CREATOR, this.REJECT_RECIPE];
  }

  toggleReadOnly():void{
    this.readOnlyFlag = !this.readOnlyFlag;
  }


}
