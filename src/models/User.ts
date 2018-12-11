import { IUser } from '../models/IUser';
import {environment} from '../environments/environment';

export class User implements IUser {
  static apiURL = environment.apiUrl;
  static baseURL = environment.baseURL;
  
  email: string;
  given: string;
  surname: string;
  userProfileImageID?: number;
  yob?: number;
  facebookURL?: string;
  instagramURL?: string;
  blogURL?: string;
  websiteURL?: string;
  gender: string;
  role: string;
  

//   constructor(email: string, firstName: string, profileImageThumbnailID?: number,
//     profileImagePreviewID?: number, gender?: string, dob?: number) {
//         this.email = email;
//         this.firstName;
//         this.profileImageThumbnailID = profileImageThumbnailID;
//         this.profileImagePreviewID = profileImagePreviewID;
//         this.dob = dob;
//     }

    constructor(iUser: any ) {
      this.email = iUser.email;
      this.given = iUser.given;
      this.userProfileImageID = iUser.userProfileImageID;
      this.yob = iUser.yob;
      this.facebookURL = iUser.facebookURL;
      this.instagramURL = iUser.instagramURL;
      this.blogURL = iUser.blogURL;
      this.websiteURL = iUser.websiteURL;
      this.gender = iUser.gender;
      this.role = iUser.role;
    }

    //FIXME
  profileImageThumbnailURL():string{
    if(this.userProfileImageID != null){
      return this.basePreviewURL(this.userProfileImageID);
    }
    else{
      return null;
    }
  }

  //FIXME
  profileImagePreviewURL():string{
    return null;
  }


  private basePreviewURL(fileID: number):string{
    return User.apiURL + "/files/Images/" + fileID; 
  }

  fullName():string{
    return this.given + this.surname;
  }
}
