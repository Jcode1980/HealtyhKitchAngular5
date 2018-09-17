import { IUser } from '../models/IUser';
import {environment} from '../environments/environment';

export class User implements IUser {
  static apiURL = environment.apiUrl;
  static baseURL = environment.baseURL;
  
  email: string;
  firstName: string;
  lastName: string;
  profileImageThumbnailID?: number;
  profileImagePreviewID?: number;
  dob?: number;
  

//   constructor(email: string, firstName: string, profileImageThumbnailID?: number,
//     profileImagePreviewID?: number, gender?: string, dob?: number) {
//         this.email = email;
//         this.firstName;
//         this.profileImageThumbnailID = profileImageThumbnailID;
//         this.profileImagePreviewID = profileImagePreviewID;
//         this.dob = dob;
//     }

    constructor(iUser: IUser ) {
            this.email = iUser.email;
            this.firstName = iUser.firstName;
            this.firstName = iUser.firstName;
            this.profileImageThumbnailID = iUser.profileImageThumbnailID;
            this.profileImagePreviewID = iUser.profileImagePreviewID;
            this.dob = iUser.dob;
        }

  profileImageThumbnailURL():string{
    if(this.profileImageThumbnailID != null){
      return this.basePreviewURL(this.profileImageThumbnailID);
    }
    else{
      return null;
    }
  }

  profileImagePreviewURL():string{
    if(this.profileImageThumbnailID != null){
      return this.basePreviewURL(this.profileImagePreviewID);
    }
    else{
      return null;
    }
  }

  private basePreviewURL(fileID: number):string{
    return User.apiURL + "/files/Images/" + fileID; 
  }
}
