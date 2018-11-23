import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/IAppState';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import { User} from '../../models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private recipesAPIURL = `api/recipes/`;
  private static oldestYear:number = 1930;
  private static newestYear:number = 2018;
  //currentUser: Observable<User>;
  currentUser:User;
  private yearsList: number[];

  constructor(private store: Store<IAppState>) { 
    console.log("UserProfileComponentUserProfileComponent");
    
  }

  async ngOnInit() {
    console.log("ngOnInitngOnInit");
    this.store.select('loggedInUser').take(1).subscribe(state => this.currentUser = state);  

    if(!this.currentUser){
      this.currentUser = new User([]);
    }
    
    
    

    // await this.store.select("loggedInUser").toPromise().then(
    //   theUser => this.currentUser = theUser
    // );
    console.log("current User");
    console.log(this.currentUser);
  }

  //FIX ME
  userProfileImageSource(){
    let imageSource;

  //  if(this.currentUser.toPromise){
  //     //console.log("333333");
  //     imageSource = this.apiURL +"files/RecipeImage/"+ this.currentRecipe.defaultImageID +"?quality=2";
  //   }
  //   //console.log("returning imagesource");
  //   //console.log(imageSource);
  //   return imageSource;

    return null;

  }

  public theYearsList():number[]{
    if(!this.yearsList){
      let currentYear:number = UserProfileComponent.oldestYear;
      let years = [];
      
      while(currentYear < UserProfileComponent.newestYear){
        years.push(currentYear++);
      }

      this.yearsList = years;
    }  

    return this.yearsList;
  }

  uploadImage(){

  }

  changePassword(){

  }

  saveProfile(){
    
  }


}
