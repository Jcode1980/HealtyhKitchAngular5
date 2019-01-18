import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAppState } from '../store/IAppState';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import { User} from '../../models/User';
import {RestService} from '../rest.service';
import {environment} from '../../environments/environment';
import { PasswordValidation } from '../validation/password-validation';


declare var $:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  apiURL = environment.apiUrl;

  private recipesAPIURL = `api/recipes/`;
  //currentUser: Observable<User>;
  currentUser:User;
  private years = [];

  //Profile image vars
  cropedFile: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  f: any;

  form: FormGroup;
  
  constructor(private store: Store<IAppState>, private restService: RestService, fb: FormBuilder) { 
    console.log("UserProfileComponentUserProfileComponent");
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    })

  }


  ngAfterViewInit(): void {
    // outputs `I am span`
    
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

    this.generateYears();
  }

  //FIX ME
  userProfileImageSource(){
    let imageSource = null;

    if(this.currentUser.userProfileImageID != null){
      imageSource = this.apiURL +"files/Images/"+ this.currentUser.userProfileImageID;
    }

    return imageSource;

  }

  public theYearsList():number[]{
    return this.years;
  }

  generateYears() {
    let currentYear = new Date().getFullYear();
    for (let i = (currentYear - 12); i >=  (currentYear - 90); i--) {
      this.years.push(i);
    }
  }

  async uploadProfileImage(){
    console.log("going to upload profile image");
    //call rest api to upload image.
    if(this.cropedFile){
      const frmData = new FormData();
      frmData.append('file', this.cropedFile, 'UserProfile.png');
      this.restService.apiPost('/session/recipe/uploadUserProfileImage', frmData).subscribe(re => {console.log(re);}, err => {
          if (err.status === 200) {
            //this.router.navigateByUrl('');
          }
      });
    
    $("#profileUploadModalID").modal("hide");
    }


  }


  showModal(){
    console.log("goat here");
  }


  imageCropped(image) {
    console.log('image', image);
    this.croppedImage = image;
    this.f = image;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCroppedFile($event: File) {
    console.log('croped file to back', $event);
    this.cropedFile = $event;
  }

  submitChangePasswordForm() {
    console.log("I'm submitting. for valid? " + this.form.valid);
    console.log(this.form);

    if(this.form.valid){
      console.log("this is the password:");
      let theNewPassword = this.form.get('password').value;
      console.log(theNewPassword);
      
      const frmData = new FormData();
      frmData.append('newPassword', theNewPassword);

      this.restService.apiPost('session/recipe/changePassword', frmData).subscribe(
        re => {
          console.log(re);
          //this.form.get('password').value
          this.form.setValue({password: '', confirmPassword: ''})
          this.form.get('password').markAsUntouched();
          this.form.get('confirmPassword').markAsUntouched();
          $("#changePassModalID").modal("hide");
          
        }, 
        
        err => {
          console.log("error is");
          console.log(err);
        }
      )
    }
  }


  saveProfile(){
    const frmData = new FormData();
    
    this.restService.apiPost('session/recipe/updateUserDetails', this.currentUser).subscribe(re => {console.log(re);}, 
    err => {
      console.log("error is");
      console.log(err);}
    )

  }

}
