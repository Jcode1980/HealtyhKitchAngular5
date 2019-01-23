import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { IMeasuredIngredient } from '../../models/IMeasuredIngredient';
import { Recipe } from '../../models/Recipe';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { IReview } from '../../models/IReview';
import { User } from '../../models/User';
import { Cookbook } from '../../models/Cookbook';
import { UserService } from '../../app/user/user.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  @Input() currentRecipe: Recipe;
  private isLoggedIn: boolean = false;
  private userCanReviewRecipe: boolean = false;
  private cookbooks: Cookbook[];

  private recipesAPIURL = `api/recipes/`;
  //currentRecipe : IRecipe;
  apiURL = environment.apiUrl;
  showReviewModal: boolean = false;

  reviewRatingNew: number;
  reviewCommentNew: string;

  ratingsList: Array<number> = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  reviews: Array<IReview> = [];

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute, private router: Router,
    private location: Location, private userService: UserService, private snackBar: MatSnackBar) { }

  backClicked() {
    this.location.back();
  }

  async ngOnInit() {
    // const id = +this.activatedRouter.snapshot.paramMap.get('id');
    // console.log("await for recipe");
    // await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise()
    //   .then(recipe => this.currentRecipe = recipe);
    // console.log("The instuction is: " + this.currentRecipe.instructions);
    // //console.log(this.currentRecipe);

    this.getReviewsForRecipe();

    this.userService.isAuthenticated().subscribe(bool => {
      console.log("the bool is " + bool);
      this.isLoggedIn = bool;
    })

    this.userService.authenticatedUserCanCreateReview(this.currentRecipe).subscribe(
      bool => this.userCanReviewRecipe = bool
    );

    this.rest.apiGet<Cookbook[]>("/session/recipe/cookbooksForUser").subscribe(
      resp => {
            //console.log("cookbooks i'm getting back: ");
            //console.log(resp);
            this.cookbooks = resp
          }
    )
  }


  //should be moved into ingredient class if used in multiple locations
  ingredientDisplay(theIngredient: IMeasuredIngredient): string {
    let theDisplay = new String(theIngredient.amount);

    if (theIngredient.metric != null && theIngredient.metric.code != null) {
      theDisplay = theDisplay.concat(" " + theIngredient.metric.code);
    }

    theDisplay = theDisplay.concat(" " + theIngredient.name);
    //console.log("the name is: " + theDisplay.toString());
    return theDisplay.toString();
  }


  recipeImageSource(): string {
    let imageSource;

    if (this.currentRecipe.defaultImageID) {
      //console.log("333333");
      imageSource = this.apiURL + "files/RecipeImage/" + this.currentRecipe.defaultImageID + "?quality=2";
    }
    //console.log("returning imagesource");
    //console.log(imageSource);
    return imageSource;

  }

  //FIX: need to do batching fetch for reviews
  async getReviewsForRecipe() {
    console.log("this is the url: ");
    console.log(this.recipesAPIURL + 'reviews');
    return this.rest.apiGet<IReview[]>(this.recipesAPIURL + 'reviews/' + this.currentRecipe.id, {}).toPromise()
      .then(reviews => {
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

  nutritionalBenefitsDisplay(): string {
    return this.displayArrayNames(this.currentRecipe.nutritionalBenefits);
  }

  dietaryRequirementsDisplay(): string {
    return this.displayArrayNames(this.currentRecipe.dietaryCategories);
  }

  cuisinesDisplay(): string {
    return this.displayArrayNames(this.currentRecipe.cuisines);
  }

  private displayArrayNames(theArray: Array<any>) {
    return theArray.map((a) => a.name).join(', ');
  }

  createReview() {
    console.log("Got to create review: " + this.reviewRatingNew);
    console.log("comment is: " + this.reviewCommentNew);

    if (this.reviewRatingNew != null && this.reviewCommentNew != null) {
      let newReview: any = {
        comment: this.reviewCommentNew,
        rating: this.reviewRatingNew
      }

      console.log("the new review being sent: ");
      console.log(newReview);

      this.rest.apiPost<IReview>(`/session/recipe/review/${this.currentRecipe.id}`, newReview).subscribe(
        re => {
          console.log(re);
          this.reviews.unshift(re);
          this.reviewCommentNew = null;
          this.reviewRatingNew = null;
          this.showReviewModal = false;
          this.userCanReviewRecipe = false;
        }, err => {
          if (err.status === 200) {
            this.router.navigateByUrl('');
          }
        });
    }
  }



  //TODO: set back to this.userIsLoggedIn when done testing
  showWriteReviewLink() {
    //return this.userIsLoggedIn();
    //return this.userCanReviewRecipe;
    return true;
  }

  userIsLoggedIn(): boolean {
    return this.isLoggedIn;
    //return false;
  }

  cookbooksForUser(): Cookbook[] {
    return this.cookbooks;
  }

  hasCookbooksForUser(): boolean {
    return this.cookbooksForUser() != null && this.cookbooksForUser().length > 0;
  }


  async addToCookbookAction(cookbook: Cookbook) {
    console.log("Adding to cookbookss: " + cookbook.name);
    let requestBody = { recipeID: this.currentRecipe.id, cookbookID: cookbook.id };

    try {
      let resp = await this.rest.apiPost("/api/cookbooks/addRecipeToCookbook", requestBody).toPromise();
      console.log("this is the resp");
      console.log(resp);
      this.openSnackBar("Recipe added to cookbook");
    } catch (err) {
      // if (err.status === 400) {
      //   return {
      //     succeeded: false,
      //     responseText: 'No user found with these email and password'
      //   };
      // }
      this.openSnackBar("Error adding recipe to cookbook");
    }
  }


  openSnackBar(message: string) {
    // this.snackBar.open('Message archived', null , {
    //   duration: 3000
    // });
    this.snackBar.open(message, null, { verticalPosition: 'top', duration: 2000 });

  }

  profileImgLink():string{
    if(this.currentRecipe.createdby.userProfileImageID != null){
      return environment.apiUrl + "files/Images/"+ this.currentRecipe.createdby.userProfileImageID;
    }
    else{
      return null;
    }
  }

}
