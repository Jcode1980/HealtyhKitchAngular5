import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import{RecipeStatus} from '../../models/RecipeStatus';
import{Mail} from '../../models/Mail';
import {RestService} from '../rest.service';
import { IRecipe } from '../../models/IRecipe';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { InjectSetupWrapper } from '@angular/core/testing';
import {UserService} from '../user/user.service';
import{AddRecipeComponent} from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-parent-recipe',
  templateUrl: './parent-recipe.component.html',
  styleUrls: ['./parent-recipe.component.scss']
})
export class ParentRecipeComponent implements OnInit {
  currentRecipe: Recipe;
  private overrideLockView: boolean = false;
  @ViewChild(AddRecipeComponent) private addRecipeComponent: AddRecipeComponent;

  selectedAction: string= "Please Select";

  private PUBLISH_RECIPE: string = "Publish";
  private EMAIL_CREATOR: string = "Email Creator";
  private REJECT_RECIPE: string = "Reject"

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute,  
    private location: Location, private userService: UserService) { }

  async ngOnInit() {

    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    console.log("id is");
    console.log(id);

    if(id !== null && id !==0){
      console.log("await for recipe");
      await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise()
      .then(recipe => this.currentRecipe = new Recipe(recipe) );
    }
    else{
      console.log("creating new recipe");
      this.currentRecipe = new Recipe(null);
    }
    
    
  }

  isAdminView():boolean{
    //console.log("returning user is admin: " );
    //console.log(this.userService.userIsAdmin());
    return this.userService.userIsAdmin();
  } 

  negatedIsAdminView(): boolean{
    return !this.isAdminView();
  }

  runSelectedAction():void{
    console.log("Running action : " + this.selectedAction);
    if(this.PUBLISH_RECIPE === this.selectedAction){
      this.publishRecipe();
    }
    else if(this.EMAIL_CREATOR === this.selectedAction){
      this.emailCreator();
    }
    

  }

  publishRecipe():void{
    //console.log("going to publish recipe");
    this.currentRecipe.recipeStatus = RecipeStatus.publishedStatus();
    this.addRecipeComponent.saveRecipe();

    let mail:Mail = new Mail(["j_adolfo@hotmail.com"], [], "johnadolfo1980@gmail.com", "First Email HTML test");
    console.log("mail is: ");
    console.log(mail);
    this.rest.apiPost(`session/recipe/sendEmail`, mail);

  }

  emailCreator():void{
    let mail:Mail = new Mail(["j_adolfo@hotmail.com"], [], "johnadolfo1980@gmail.com", "First Email HTML test");
    console.log("mail is: ");
    console.log(mail);
    this.rest.apiPost('session/recipe/sendEmail', mail).subscribe(re => console.log("mail has been sent"));

  }



  backClicked() {
    this.location.back();
  }

  showViewOnly():boolean{
    if(this.overrideLockView){
      return false;
    }
    else if(this.currentRecipe.isSubmittedForApproval() && this.isAdminView()){
      return false;
    }
    //default view is just read only if no other conditions are meet
    else{
      return true;
    }
    
  }

  negatedShowViewOnly():boolean{
    return !this.showViewOnly();
  }

  recipeActions():string[]{
    
    if(this.currentRecipe.isSubmittedForApproval()){
      return [this.PUBLISH_RECIPE, this.EMAIL_CREATOR];
    }
    else{
      return [];
    }
  }

  showRecipeActions(): boolean{
    return this.recipeActions().length > 0; 
  }

  toggleReadOnly():void{
    this.overrideLockView = !this.overrideLockView;
  }


}
